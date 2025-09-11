import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure directories exist
const dataDir = path.join(__dirname, '../src/data/service-areas');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Load locations data
const locationsDataPath = path.join(__dirname, '../src/data/service-areas/locations.json');
const locationsData = JSON.parse(fs.readFileSync(locationsDataPath, 'utf8'));

// Service categories and services
const services = [
  {
    name: "AC Installation",
    slug: "ac-installation",
    category: "air-conditioning"
  },
  {
    name: "AC Repair",
    slug: "ac-repair",
    category: "air-conditioning"
  },
  {
    name: "AC Maintenance",
    slug: "ac-maintenance",
    category: "air-conditioning"
  },
  {
    name: "Emergency AC Repair",
    slug: "emergency-ac-repair",
    category: "air-conditioning"
  },
  {
    name: "Ductless Mini-Split Systems",
    slug: "ductless-mini-split",
    category: "air-conditioning"
  },
  {
    name: "Furnace Installation",
    slug: "furnace-installation",
    category: "heating"
  },
  {
    name: "Furnace Repair",
    slug: "furnace-repair",
    category: "heating"
  },
  {
    name: "Heat Pump Services",
    slug: "heat-pump-services",
    category: "heating"
  },
  {
    name: "Emergency Heating Repair",
    slug: "emergency-heating-repair",
    category: "heating"
  },
  {
    name: "Heating Maintenance",
    slug: "heating-maintenance",
    category: "heating"
  },
  {
    name: "HVAC Installation",
    slug: "hvac-installation",
    category: "installation"
  },
  {
    name: "HVAC Replacement",
    slug: "hvac-replacement",
    category: "installation"
  },
  {
    name: "Ductwork Installation",
    slug: "ductwork-installation",
    category: "installation"
  },
  {
    name: "Thermostat Installation",
    slug: "thermostat-installation",
    category: "installation"
  },
  {
    name: "Air Purification Systems",
    slug: "air-purification-systems",
    category: "indoor-air-quality"
  },
  {
    name: "Air Quality Testing",
    slug: "air-quality-testing",
    category: "indoor-air-quality"
  },
  {
    name: "Humidifiers & Dehumidifiers",
    slug: "humidifiers-dehumidifiers",
    category: "indoor-air-quality"
  },
  {
    name: "Duct Cleaning",
    slug: "duct-cleaning",
    category: "indoor-air-quality"
  },
  {
    name: "UV Light Installation",
    slug: "uv-light-installation",
    category: "indoor-air-quality"
  }
];

// Generate city data files
locationsData.forEach(location => {
  // Skip Bell County as it's not a specific city
  if (location.slug === 'bell-county') return;

  const cityDir = path.join(dataDir, location.slug);
  if (!fs.existsSync(cityDir)) {
    fs.mkdirSync(cityDir, { recursive: true });
  }

  // Create city data file
  const cityData = {
    cityName: location.name,
    citySlug: location.slug,
    state: location.state,
    zipCodes: ["00000"], // Placeholder, would need real data
    countyName: "Bell County", // Placeholder, would need real data
    latitude: 31.0557, // Placeholder, would need real data
    longitude: -97.4647, // Placeholder, would need real data
    population: 20000, // Placeholder, would need real data
    description: `${location.name} is a city in Bell County, Texas, United States.`,
    services: services,
    seo: {
      title: `HVAC Services in ${location.name}, ${location.state} | Alltek Services`,
      metaDescription: `Professional HVAC services in ${location.name}, ${location.state} including air conditioning, heating, and indoor air quality solutions. Trusted local experts serving ${location.name} and surrounding areas.`,
      keywords: [
        `HVAC ${location.name} TX`,
        `air conditioning ${location.name}`,
        `heating services ${location.name}`,
        `furnace repair ${location.name}`,
        `AC installation ${location.name}`,
        `indoor air quality ${location.name}`,
        `HVAC contractor ${location.name}`
      ],
      canonicalUrl: `https://www.alltek-services.com/service-areas/${location.slug}/`,
      ogTitle: `HVAC Services in ${location.name}, ${location.state} | Alltek Services`,
      ogDescription: `Professional HVAC services in ${location.name}, ${location.state} including air conditioning, heating, and indoor air quality solutions. Trusted local experts serving ${location.name} and surrounding areas.`,
      ogImage: "https://www.alltek-services.com/images/optimized/fleet/service-fleet.webp",
      twitterCard: "summary_large_image",
      twitterTitle: `HVAC Services in ${location.name}, ${location.state} | Alltek Services`,
      twitterDescription: `Professional HVAC services in ${location.name}, ${location.state} including air conditioning, heating, and indoor air quality solutions. Trusted local experts serving ${location.name} and surrounding areas.`,
      twitterImage: "https://www.alltek-services.com/images/optimized/fleet/service-fleet.webp"
    }
  };

  fs.writeFileSync(
    path.join(dataDir, `${location.slug}.json`),
    JSON.stringify(cityData, null, 2)
  );
  console.log(`Generated city data for ${location.name}`);

  // Create service data files for each city
  services.forEach(service => {
    const serviceData = {
      cityName: location.name,
      citySlug: location.slug,
      state: location.state,
      serviceName: service.name,
      serviceSlug: service.slug,
      seo: {
        title: `${service.name} in ${location.name}, ${location.state} | Alltek Services`,
        metaDescription: `Professional ${service.name.toLowerCase()} services in ${location.name}, ${location.state}. Reliable, affordable solutions from Alltek Services, your trusted local HVAC experts.`,
        h1: `${service.name.toUpperCase()} IN ${location.name.toUpperCase()}, ${location.state}`,
        keywords: [
          `${service.name} ${location.name}`,
          `${service.category} services ${location.name}`,
          `HVAC ${location.name}`,
          `${service.name.toLowerCase()} near me`,
          `${service.category} contractor ${location.name}`,
          `affordable ${service.name.toLowerCase()} ${location.name}`
        ],
        longtailKeywords: [
          `best ${service.name.toLowerCase()} company in ${location.name}`,
          `${service.name.toLowerCase()} cost ${location.name}`,
          `emergency ${service.name.toLowerCase()} ${location.name}`,
          `${service.name.toLowerCase()} experts ${location.name} TX`
        ],
        entities: [
          "HVAC Services",
          `${service.name}`,
          `${location.name}, ${location.state}`,
          "Alltek Services",
          "Heating and Cooling",
          "Indoor Air Quality"
        ],
        lsiKeywords: [
          `${service.category} solutions`,
          "energy efficiency",
          "home comfort",
          "professional HVAC",
          "licensed technicians",
          "customer satisfaction"
        ],
        canonicalUrl: `https://www.alltek-services.com/service-areas/${location.slug}/${service.slug}/`,
        ogTitle: `${service.name} in ${location.name}, ${location.state} | Alltek Services`,
        ogDescription: `Professional ${service.name.toLowerCase()} services in ${location.name}, ${location.state}. Reliable, affordable solutions from Alltek Services, your trusted local HVAC experts.`,
        ogImage: "https://www.alltek-services.com/images/optimized/fleet/service-fleet.webp",
        twitterCard: "summary_large_image",
        twitterTitle: `${service.name} in ${location.name}, ${location.state} | Alltek Services`,
        twitterDescription: `Professional ${service.name.toLowerCase()} services in ${location.name}, ${location.state}. Reliable, affordable solutions from Alltek Services, your trusted local HVAC experts.`,
        twitterImage: "https://www.alltek-services.com/images/optimized/fleet/service-fleet.webp"
      },
      content: {
        introduction: `Looking for professional ${service.name.toLowerCase()} services in ${location.name}, ${location.state}? Alltek Services provides expert solutions with skilled technicians, quality equipment, and exceptional customer service.`,
        sections: [
          {
            title: `PROFESSIONAL ${service.name.toUpperCase()} IN ${location.name.toUpperCase()}`,
            content: `<p>At Alltek Services, we specialize in providing top-quality ${service.name.toLowerCase()} services to homeowners and businesses throughout ${location.name} and surrounding areas. Our team of certified technicians has the expertise and equipment to handle all your ${service.category} needs efficiently and effectively.</p><p>We understand that every property in ${location.name} has unique requirements, which is why we offer customized solutions tailored to your specific situation. Whether you need a routine service or an emergency repair, you can count on us for prompt, professional assistance.</p>`,
            keywords: [`${service.name} ${location.name}`, `professional ${service.category} services`, `certified technicians`, `customized solutions`]
          },
          {
            title: `WHY CHOOSE ALLTEK SERVICES FOR ${service.name.toUpperCase()} IN ${location.name.toUpperCase()}`,
            content: `<p>When you choose Alltek Services for your ${service.name.toLowerCase()} needs in ${location.name}, you're partnering with a company that prioritizes quality workmanship, reliability, and customer satisfaction. Here's what sets us apart:</p><ul class="list-disc pl-6 space-y-2"><li><strong>Experienced Technicians:</strong> Our team is fully trained, licensed, and certified to handle all aspects of ${service.name.toLowerCase()}.</li><li><strong>Quality Equipment:</strong> We use only the highest quality parts and equipment for all our services.</li><li><strong>Transparent Pricing:</strong> We provide upfront, honest pricing with no hidden fees or surprises.</li><li><strong>Prompt Service:</strong> We respect your time and arrive when scheduled, completing work efficiently without sacrificing quality.</li><li><strong>Customer Satisfaction:</strong> Your comfort and satisfaction are our top priorities, and we stand behind our work with solid guarantees.</li></ul>`,
            keywords: [`experienced HVAC technicians`, `quality equipment`, `transparent pricing`, `prompt service`, `customer satisfaction`]
          },
          {
            title: `OUR ${service.name.toUpperCase()} PROCESS IN ${location.name.toUpperCase()}`,
            content: `<p>Our comprehensive approach to ${service.name.toLowerCase()} in ${location.name} ensures that you receive the best possible service:</p><ol class="list-decimal pl-6 space-y-2"><li><strong>Initial Consultation:</strong> We begin by understanding your specific needs and concerns.</li><li><strong>Thorough Assessment:</strong> Our technicians conduct a detailed evaluation of your current system and requirements.</li><li><strong>Customized Solution:</strong> We develop a tailored plan that addresses your unique situation.</li><li><strong>Professional Implementation:</strong> Our skilled team executes the plan with precision and attention to detail.</li><li><strong>Quality Assurance:</strong> We perform comprehensive testing to ensure everything functions correctly.</li><li><strong>Follow-up Support:</strong> We provide ongoing maintenance and support to keep your system operating at peak efficiency.</li></ol>`,
            keywords: [`${service.name.toLowerCase()} process`, `initial consultation`, `thorough assessment`, `customized solution`, `professional implementation`, `quality assurance`]
          }
        ],
        callToAction: `Ready to experience the Alltek Services difference? Contact us today to schedule your ${service.name.toLowerCase()} service in ${location.name}, ${location.state}. Our friendly team is standing by to assist you with all your HVAC needs.`,
        faq: [
          {
            question: `How much does ${service.name.toLowerCase()} cost in ${location.name}, ${location.state}?`,
            answer: `The cost of ${service.name.toLowerCase()} in ${location.name} varies depending on factors such as the size of your property, the complexity of the job, and the specific equipment needed. At Alltek Services, we provide free, no-obligation estimates tailored to your unique situation. Contact us today to schedule a consultation and receive a detailed quote for your ${service.name.toLowerCase()} needs.`
          },
          {
            question: `How long does ${service.name.toLowerCase()} typically take in ${location.name}?`,
            answer: `The timeframe for ${service.name.toLowerCase()} in ${location.name} depends on the scope of the project. Simple services may be completed in a few hours, while more complex installations or repairs might take a full day or longer. Our technicians work efficiently without compromising quality and will provide you with a realistic timeline before beginning any work.`
          },
          {
            question: `Do you offer emergency ${service.name.toLowerCase()} services in ${location.name}?`,
            answer: `Yes, Alltek Services provides emergency ${service.name.toLowerCase()} services to residents and businesses in ${location.name} and surrounding areas. We understand that HVAC issues don't always occur during regular business hours, which is why our team is available 24/7 to address urgent situations. Contact our emergency line at (254) 773-4822 for immediate assistance.`
          },
          {
            question: `Are your technicians certified to perform ${service.name.toLowerCase()} in ${location.name}?`,
            answer: `Absolutely. All Alltek Services technicians are fully licensed, insured, and certified to perform ${service.name.toLowerCase()} in ${location.name} and throughout Texas. Our team undergoes regular training to stay current with the latest industry standards, technologies, and best practices, ensuring you receive the highest quality service possible.`
          },
          {
            question: `Do you offer warranties for ${service.name.toLowerCase()} in ${location.name}?`,
            answer: `Yes, Alltek Services stands behind our work with comprehensive warranties for ${service.name.toLowerCase()} in ${location.name}. We offer manufacturer warranties on all equipment installed, as well as our own workmanship guarantee. The specific terms vary depending on the service provided, and our team will explain all warranty details before beginning any work.`
          }
        ]
      },
      schemaMarkup: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `${service.name} in ${location.name}, ${location.state}`,
          "serviceType": "HVAC",
          "provider": {
            "@type": "HVACBusiness",
            "name": "Alltek Services",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1181 FM-2271 Hwy",
              "addressLocality": "Belton",
              "addressRegion": "TX",
              "postalCode": "76513",
              "addressCountry": "US"
            },
            "telephone": "+1-254-773-4822",
            "priceRange": "$$"
          },
          "areaServed": {
            "@type": "City",
            "name": `${location.name}, ${location.state}`
          },
          "description": `Professional ${service.name.toLowerCase()} services in ${location.name}, ${location.state}. Reliable, affordable solutions from Alltek Services, your trusted local HVAC experts.`,
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "priceCurrency": "USD"
            }
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": `How much does ${service.name.toLowerCase()} cost in ${location.name}, ${location.state}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `The cost of ${service.name.toLowerCase()} in ${location.name} varies depending on factors such as the size of your property, the complexity of the job, and the specific equipment needed. At Alltek Services, we provide free, no-obligation estimates tailored to your unique situation. Contact us today to schedule a consultation and receive a detailed quote for your ${service.name.toLowerCase()} needs.`
              }
            },
            {
              "@type": "Question",
              "name": `How long does ${service.name.toLowerCase()} typically take in ${location.name}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `The timeframe for ${service.name.toLowerCase()} in ${location.name} depends on the scope of the project. Simple services may be completed in a few hours, while more complex installations or repairs might take a full day or longer. Our technicians work efficiently without compromising quality and will provide you with a realistic timeline before beginning any work.`
              }
            },
            {
              "@type": "Question",
              "name": `Do you offer emergency ${service.name.toLowerCase()} services in ${location.name}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Yes, Alltek Services provides emergency ${service.name.toLowerCase()} services to residents and businesses in ${location.name} and surrounding areas. We understand that HVAC issues don't always occur during regular business hours, which is why our team is available 24/7 to address urgent situations. Contact our emergency line at (254) 773-4822 for immediate assistance.`
              }
            }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Alltek Services",
          "image": "/images/Logo.png",
          "telephone": "+1-254-773-4822",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1181 FM-2271 Hwy",
            "addressLocality": "Belton",
            "addressRegion": "TX",
            "postalCode": "76513",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 31.0557,
            "longitude": -97.4647
          },
          "url": `https://www.alltek-services.com/service-areas/${location.slug}/${service.slug}/`,
          "priceRange": "$$",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "18:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Saturday",
              "opens": "09:00",
              "closes": "16:00"
            }
          ],
          "sameAs": [
            "https://www.facebook.com/Alltekhvacservices/",
            "https://www.instagram.com/alltekhvacservices/"
          ]
        }
      ]
    };

    fs.writeFileSync(
      path.join(cityDir, `${service.slug}.json`),
      JSON.stringify(serviceData, null, 2)
    );
    console.log(`Generated service data for ${service.name} in ${location.name}`);
  });
});

console.log('Service area data generation complete!');
