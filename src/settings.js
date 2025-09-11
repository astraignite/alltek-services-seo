// Settings object for Alltek Services HVAC website
// This file contains centralized settings that can be imported and used across the site

// USE: Note make sure the level of settings.js is correct for the file you are adding

// import settings from '../settings.js';
// <a href={`tel:${settings.phoneRaw}`}>{settings.phone}</a>

const settings = {
  //Note - NoFollow setting is set up in the GoogleHead component


  // Contact Information  "Main" versions are for in LD objects
  phone: "(254) 721-7049",
  phonePlaceholder: "254-721-7049", // Use in form phone placeholders
  phoneRaw: "+12547217049", // For tel: links
  phoneMain: "(254) 721-7049", // Main phone from structured data
  phoneMainRaw: "+12547217049", // Main phone for tel: links
  email: "info@alltek-services.com", // Placeholder email

  // Google Analytics ID
  gaid: "G-4MNK78735N",

  // Company Information
  companyName: "Alltek Services",
  address: {
    street: "1181 FM-2271 Hwy",
    city: "Belton",
    state: "TX",
    zip: "76513",
    country: "US"
  },

  // Social Media
  social: {
    facebook: "https://www.facebook.com/Alltekhvacservices/",
    instagram: "https://www.instagram.com/alltekhvacservices/?hl=en",
    yelp: "https://www.yelp.com/biz/alltek-services-belton",
    angi: "https://www.angi.com/companylist/us/tx/belton/alltek-services-reviews-7780573.htm"
  },
  googleReview: "https://www.google.com/"
};

export default settings;
