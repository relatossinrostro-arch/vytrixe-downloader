/**
 * VYTRIXE Adsterra Configuration
 * Centralized registry for ad placement Zone IDs and tokens.
 * Update these with your actual Adsterra dashboard values.
 */

export const ADS_CONFIG = {
  // Banner 728x90 (Desktop) / 320x50 (Mobile)
  BANNER_TOP: {
    id: "YOUR_ADSTERRA_KEY_HERE",
    format: "728x90",
    mobileFormat: "320x50",
    minHeight: "90px"
  },
  
  // Banner 728x90 or Rectangular
  BANNER_MID: {
    id: "YOUR_ADSTERRA_KEY_HERE",
    format: "728x90",
    minHeight: "90px"
  },
  
  // Bottom Wide Banner
  BANNER_BOTTOM: {
    id: "YOUR_ADSTERRA_KEY_HERE",
    format: "728x90",
    minHeight: "90px"
  },
  
  // Native Ad Block (Grid)
  NATIVE: {
    id: "YOUR_ADSTERRA_KEY_HERE",
    count: 4,
    minHeight: "250px"
  },
  
  // Popunder (Capped 1/24h)
  POPUNDER: {
    id: "YOUR_ADSTERRA_KEY_HERE",
    frequencyMinutes: 1440 // 24 Hours
  },
  
  // Social Bar / Direct Link placeholders if needed
  SOCIAL_BAR: {
    id: "YOUR_ADSTERRA_KEY_HERE"
  }
};
