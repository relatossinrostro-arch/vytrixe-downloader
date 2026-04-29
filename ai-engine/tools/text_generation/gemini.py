import json
import re
from typing import Any, Type, TypeVar

from pydantic import BaseModel
from google.genai import errors

from tools.common.gemini_base import GeminiBase
from tools.common.messenger import Messenger

T = TypeVar("T", bound=BaseModel)


class GeminiTextGenerator(GeminiBase):
    text_model: str = "gemini-2.5-flash-lite"

    def __init__(self, **kwargs: Any):
        super().__init__(**kwargs)

    def generate_text(self, prompt: str, schema: Type[T]) -> T:
        """
        Generates content with Gemini and parses it into a Pydantic model.
        Includes a fallback to manual JSON parsing if schema-based generation fails.
        """
        try:
            # Attempt 1: Using response_schema (Native Structured Output)
            response = self.client.models.generate_content(
                model=self.text_model,
                contents=prompt,
                config={
                    'response_mime_type': 'application/json',
                    'response_schema': schema,
                }
            )
            self._extract_usage(response, self.text_model)

            if not response.text:
                raise RuntimeError("❌ No hay respuesta de Gemini")

            return schema.model_validate_json(response.text)

        except Exception as e:
            Messenger.warning(f"Error en esquema nativo: {e}. Intentando fallback...")
            
            # Attempt 2: Fallback to plain text prompt and manual parsing
            # We add a reminder for JSON format to the prompt
            fallback_prompt = prompt + "\n\nIMPORTANT: Return ONLY a valid JSON object. Do not include markdown code blocks."
            
            response = self.client.models.generate_content(
                model=self.text_model,
                contents=fallback_prompt
            )
            self._extract_usage(response, self.text_model)

            if not response.text:
                raise RuntimeError("❌ No hay respuesta en el fallback de Gemini")

            # Clean markdown if present
            cleaned_text = response.text.strip()
            if cleaned_text.startswith("```json"):
                cleaned_text = re.sub(r"^```json\n?", "", cleaned_text)
                cleaned_text = re.sub(r"\n?```$", "", cleaned_text)
            elif cleaned_text.startswith("```"):
                cleaned_text = re.sub(r"^```\n?", "", cleaned_text)
                cleaned_text = re.sub(r"\n?```$", "", cleaned_text)

            try:
                # Attempt to parse and validate
                data = json.loads(cleaned_text)
                return schema.model_validate(data)
            except Exception as parse_error:
                Messenger.error(f"Fallo crítico parseando JSON: {parse_error}")
                Messenger.info(f"Contenido problemático: {cleaned_text}")
                raise RuntimeError(f"No se pudo obtener un JSON válido: {parse_error}")
