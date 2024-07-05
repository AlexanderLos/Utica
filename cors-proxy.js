const CORS_PROXY = 'https://your-cors-proxy.herokuapp.com/';

axios.get(`${CORS_PROXY}${API_URL}`, {
  params: {
    query: selectedCryptoItem.toLowerCase(),
    near: query,
    categories: '11044,11045,11046,11051', // Categories for crypto ATMs, stores, and banks
    limit: 50 // Example limit
  },
  headers: {
    'Accept': 'application/json',
    'Authorization': API_KEY
  }
}).then(res => {
  console.log('API Response:', res.data);
  // handle response
}).catch(err => {
  console.error('API Error:', err);
  console.error('Error Response:', err.response);
});
