import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Newspaper, Database, Users, Factory, Briefcase } from 'lucide-react';

const categories = [
  { name: 'ERP', icon: Database, description: 'Enterprise Resource Planning' },
  { name: 'CRM', icon: Users, description: 'Customer Relationship Management' },
  { name: 'MES', icon: Factory, description: 'Manufacturing Execution System' },
  { name: 'HRM', icon: Briefcase, description: 'Human Resource Management' },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setIsLoading(true);
    const API_KEY = '8ce698a2b73045eeae7a90a62ad0d8b4';
    const url = `https://newsapi.org/v2/everything?q=ERP OR CRM OR MES OR HRM&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setNews(data.articles.slice(0, 5));
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-indigo-800 mb-4">Enterprise Solutions Hub</h1>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="flex-grow p-2 rounded-l-md border-2 border-indigo-300 focus:outline-none focus:border-indigo-500"
          />
          <button type="submit" className="bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700 transition duration-300">
            <Search size={24} />
          </button>
        </form>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <div key={category.name} className="bg-indigo-50 p-4 rounded-md flex flex-col items-center text-center">
                <category.icon size={40} className="text-indigo-600 mb-2" />
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Latest News</h2>
          <button
            onClick={fetchNews}
            className="mb-4 btn btn-primary flex items-center"
            disabled={isLoading}
          >
            <Newspaper size={20} className="mr-2" />
            {isLoading ? 'Fetching...' : 'Refresh News'}
          </button>
          {isLoading ? (
            <p>Loading news...</p>
          ) : (
            <ul className="space-y-4">
              {news.map((item, index) => (
                <li key={index} className="border-b pb-2 last:border-b-0">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-semibold">
                    {item.title}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">{item.source.name} - {new Date(item.publishedAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="mt-8 text-center text-gray-600">
        <p>© 2023 Enterprise Solutions Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;