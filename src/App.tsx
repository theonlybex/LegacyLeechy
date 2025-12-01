import { ChevronRight, Search, MessageSquare, Plus, Download, Apple, Play, SlidersHorizontal, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, type Listing } from './lib/supabase';
import SignUpPage from './components/SignUpPage';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceMin, setPriceMin] = useState(1);
  const [priceMax, setPriceMax] = useState(10000);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (searchOpen) {
      fetchListings();
    }
  }, [searchOpen, selectedCategory, priceMin, priceMax]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('listings')
        .select('*')
        .gte('price', priceMin)
        .lte('price', priceMax)
        .order('created_at', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      title: 'Electronics',
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      title: 'Fashion & Accessories',
      image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      title: 'Home & Garden',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      title: 'Sports & Outdoors',
      image: 'https://images.pexels.com/photos/3945636/pexels-photo-3945636.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      title: 'Books & Media',
      image: 'https://images.pexels.com/photos/2131662/pexels-photo-2131662.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      title: 'Collectibles',
      image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
  ];

  const steps = [
    { number: 1, title: 'List Your Item', description: 'Take photos, add details, and set your price' },
    { number: 2, title: 'Get Discovered', description: 'Buyers browse and find exactly what they want' },
    { number: 3, title: 'Make the Sale', description: 'Connect with buyers and arrange delivery' },
    { number: 4, title: 'Earn Cash', description: 'Get paid securely through our platform' },
  ];

  const mockItems = [
    { id: 1, name: 'Jackery Battery Charger', price: '$4.00 per day', owner: 'Juan Carlos L', image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 2, name: 'Smart TV', price: '$25.00 per day', owner: 'Laura S', image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, name: 'Insulated Bottle', price: '$1.50 per day', owner: 'Kareem A', image: 'https://images.pexels.com/photos/4397838/pexels-photo-4397838.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 4, name: 'Rowing Machine', price: '$5.00 per day', owner: 'Jose L', image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 5, name: 'GoPro 9', price: '$15.00 per day', owner: 'Hooper T', image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 6, name: 'Logitech Driving Wheel', price: '$75.00 per day', owner: 'Hooper T', image: 'https://images.pexels.com/photos/7973942/pexels-photo-7973942.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 7, name: '3-person tent', price: '$10.00 per day', owner: 'Hooper T', image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 8, name: 'Lawnmower', price: '$20.00 per day', owner: 'Juan Carlos L', image: 'https://images.pexels.com/photos/1lawn/pexels-photo-lawn.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 9, name: 'Gold chain', price: '$40.00 per day', owner: 'Rocky M', image: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 10, name: 'Skateboard', price: '$20.00 per day', owner: 'Akash M', image: 'https://images.pexels.com/photos/163429/skateboard-skate-wheel-roll-163429.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 11, name: 'Pocket bible', price: '$15.00 per day', owner: 'Narya S', image: 'https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 12, name: 'Mini basketball hoop', price: '$15.00 per day', owner: 'Shreya R', image: 'https://images.pexels.com/photos/1089550/pexels-photo-1089550.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 13, name: 'T shirt', price: '$7.00 per day', owner: 'Uday S', image: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 14, name: 'Speaker', price: '$4.00 per day', owner: 'Sahivk K', image: 'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 15, name: 'Bedside lamp', price: '$15.00 per day', owner: 'Ansh P', image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setFilterOpen(false);
                }}
                className="hover:opacity-80 transition cursor-pointer"
              >
                <img
                  src="/leechyLlogo.jpg"
                  alt="Leechy Logo"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>
              <div className="hidden md:flex items-center flex-1 max-w-md">
                <div className="relative w-full">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search listings..."
                    onFocus={() => {
                      setSearchOpen(true);
                      setFilterOpen(true);
                    }}
                    className="w-full pl-10 pr-4 py-2 bg-transparent text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setShowSignUp(true)}
                className="text-green-600 hover:text-green-700 transition font-medium"
              >
                Post a new listing
              </button>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setFilterOpen(false);
                }}
                className="text-gray-900 hover:text-gray-700 transition font-medium"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setSearchOpen(true);
                  setFilterOpen(true);
                }}
                className="text-gray-900 hover:text-gray-700 transition font-medium"
              >
                Listings
              </button>
              <button
                onClick={() => setShowSignUp(true)}
                className="text-gray-900 hover:text-gray-700 transition font-medium"
              >
                Sign up
              </button>
              <button
                onClick={() => setShowSignUp(true)}
                className="text-gray-900 hover:text-gray-700 transition font-medium"
              >
                Log in
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Filter Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-lg z-40 transition-all duration-300 ease-in-out overflow-y-auto ${
          filterOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={() => setFilterOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-2 text-left font-medium text-gray-900">
              <span>Category</span>
              <Minus size={16} className="text-gray-400" />
            </button>
            <div className="space-y-2 text-sm">
              {selectedCategory && (
                <div className="mb-3 p-2 bg-green-50 rounded-md">
                  <span className="text-green-700 font-medium">Filtered: {selectedCategory}</span>
                </div>
              )}
              {categories.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => setSelectedCategory(cat.title)}
                  className={`w-full text-left flex items-center space-x-2 cursor-pointer hover:text-gray-900 py-1 ${
                    selectedCategory === cat.title ? 'text-green-600 font-medium' : 'text-gray-600'
                  }`}
                >
                  <span>{cat.title}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedCategory('')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Dates Filter */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-2 text-left font-medium text-gray-900">
              <span>Dates</span>
              <Plus size={16} className="text-gray-400" />
            </button>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Price Filter */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-2 text-left font-medium text-gray-900">
              <span>Price</span>
              <Minus size={16} className="text-gray-400" />
            </button>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(Number(e.target.value))}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="relative pt-2">
                <input
                  type="range"
                  min="1"
                  max="10000"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
              </div>
            </div>
            <button
              onClick={() => {
                setPriceMin(1);
                setPriceMax(10000);
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>

          <div className="border-t border-gray-200"></div>

          <button
            onClick={() => {
              setSelectedCategory('');
              setPriceMin(1);
              setPriceMax(10000);
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Reset all
          </button>
        </div>
      </div>

      {/* Overlay */}
      {filterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={() => {
            setFilterOpen(false);
            setSearchOpen(false);
          }}
        ></div>
      )}

      {/* Items Window */}
      <div
        className={`fixed top-16 right-0 h-[calc(100vh-4rem)] bg-white border-l border-gray-200 shadow-lg z-40 transition-all duration-300 ease-in-out overflow-y-auto ${
          searchOpen ? 'w-[calc(100vw-20rem)] translate-x-0' : 'w-[calc(100vw-20rem)] translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Browse Items</h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => {
                setSearchOpen(false);
                setFilterOpen(false);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">No listings found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.map((listing) => (
                <div key={listing.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-3">
                    <img
                      src={listing.image_url || 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=600'}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-green-600 font-semibold">${listing.price.toFixed(2)}</p>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{listing.condition}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-gray-700">{listing.title}</h3>
                    <p className="text-sm text-gray-500">{listing.location || 'Location not specified'}</p>
                    <p className="text-xs text-gray-400">{listing.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-green-600 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-8">
                <div>
                  <img
                    src="/LeechyMainLogoTransparentCut.png"
                    alt="Leechy Logo"
                    className="w-52 h-auto -ml-3 -mt-8 mb-4"
                  />
                  <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    List it. Earn on it.
                  </h1>
                </div>
                <p className="text-xl text-gray-100">
                  Turn your unused items into cash.<br />List your items and start earning today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowSignUp(true)}
                  className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  Start Selling
                </button>
                <button
                  onClick={() => {
                    setSearchOpen(true);
                    setFilterOpen(true);
                  }}
                  className="bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Browse Listings
                </button>
              </div>
            </div>

            <div className="relative h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Featured Categories</h2>
            <p className="text-gray-600 mt-2">Explore what's trending right now</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl h-64 bg-gray-200">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                    <button
                      onClick={() => {
                        setSelectedCategory(category.title);
                        setSearchOpen(true);
                        setFilterOpen(true);
                      }}
                      className="flex items-center space-x-2 bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                      <span>See listings</span>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-4">{category.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-600 text-lg mt-2">Four simple steps to start earning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-8 h-full border border-gray-100 hover:border-gray-300 transition">
                  <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/3 -right-4 transform translate-x-1/2">
                    <ChevronRight size={24} className="text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App */}
      <section className="py-8 bg-gradient-to-r from-teal-700 via-teal-600 to-green-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Get the Leechy App</h2>
                <p className="text-gray-300 text-lg">
                  Manage your listings, chat with buyers, and track earnings on the go.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src="/appStoreButton.png"
                  alt="Download on the App Store"
                  className="h-12 w-auto cursor-pointer hover:opacity-80 transition"
                />
                <img
                  src="/GooglePlayButton.png"
                  alt="Get it on Google Play"
                  className="h-12 w-auto cursor-pointer hover:opacity-80 transition"
                />
              </div>
            </div>

            <div className="relative flex items-center justify-center h-[600px]">
              <img
                src="/TransparentAppleStore copy.PNG"
                alt="App preview"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-4">leechy</div>
              <p className="text-gray-600">Turn your unused items into cash.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Browse</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition">All Listings</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Categories</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Trending</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Sell</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition">How to Sell</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Safety Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition">About</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Contact</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-600 text-center">
              &copy; 2024 Leechy Marketplace. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {showSignUp && <SignUpPage onClose={() => setShowSignUp(false)} />}
    </div>
  );
}

export default App;
