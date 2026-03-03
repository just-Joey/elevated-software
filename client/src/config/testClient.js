const testClient = {
  clientId: "test-landscaping-co",
  brand: {
    primaryColor: "#2E7D32",
    secondaryColor: "#A5D6A7",
    logoUrl: null,
    fontFamily: "Inter",
  },
  business: {
    name: "Test Landscaping Co",
    phone: "720-555-0101",
    serviceArea: "Denver Metro",
    hours: "Mon-Sat 7am-6pm",
    services: ["Mowing", "Aeration", "Fertilization", "Snow Removal"],
  },
  chatbot: {
    welcomeMessage: "Hey! Need a quote or have questions?",
    systemPrompt: `You are a helpful assistant for Test Landscaping Co, 
      a landscaping business serving the Denver Metro area. 
      You help customers get quotes, answer questions about services, 
      and capture their contact information. 
      Always be friendly and professional.
      If asked about pricing, let them know you'll need a few details 
      and offer to connect them with the owner.
      Services offered: Mowing, Aeration, Fertilization, Snow Removal.
      Hours: Mon-Sat 7am-6pm.
      Phone: 720-555-0101.`,
  },
  tools: ["chatbot", "quoteForm", "gallery", "reviewPrompt"],
}

export default testClient