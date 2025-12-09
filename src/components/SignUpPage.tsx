import { useState } from 'react';
import { Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SignUpPageProps {
  onClose: () => void;
  initialTab?: 'signup' | 'login';
}

export default function SignUpPage({ onClose, initialTab = 'signup' }: SignUpPageProps) {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>(initialTab);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    acceptTerms: false,
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp, signIn } = useAuth();

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signUp(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    );

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signIn(loginData.email, loginData.password);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-r from-teal-700 via-teal-600 to-green-600">
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={onClose}
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
                    className="w-full pl-10 pr-4 py-2 bg-transparent text-gray-900 placeholder-gray-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <button className="text-green-600 hover:text-green-700 transition font-medium">Post a new listing</button>
              <button
                onClick={onClose}
                className="text-gray-900 hover:text-gray-700 transition font-medium"
              >
                Home
              </button>
              <button
                onClick={onClose}
                className="text-gray-900 hover:text-gray-700 transition font-medium"
              >
                Listings
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className="text-gray-900 hover:text-gray-700 transition font-medium"
              >
                Sign up
              </button>
              <button
                onClick={() => setActiveTab('login')}
                className="text-gray-900 hover:text-gray-700 transition font-medium"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="absolute inset-0 top-16 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cg fill='none' stroke='white' stroke-width='2'%3E%3Ccircle cx='100' cy='100' r='40'/%3E%3Crect x='200' y='150' width='80' height='60'/%3E%3Cpath d='M300 300 L350 250 L400 300'/%3E%3Cellipse cx='500' cy='200' rx='50' ry='30'/%3E%3Cpolygon points='600,150 650,200 600,250 550,200'/%3E%3Ccircle cx='800' cy='400' r='35'/%3E%3Crect x='900' y='350' width='70' height='90'/%3E%3Cpath d='M100 500 Q150 450 200 500'/%3E%3Cellipse cx='350' cy='600' rx='45' ry='25'/%3E%3Cpolygon points='500,550 550,600 500,650 450,600'/%3E%3Ccircle cx='700' cy='650' r='30'/%3E%3Crect x='850' y='600' width='60' height='80'/%3E%3Cpath d='M1000 500 L1050 550 L1100 500'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}></div>

      <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-4 text-center font-semibold transition ${
              activeTab === 'signup'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign up
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 text-center font-semibold transition ${
              activeTab === 'login'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Log in
          </button>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              Success! Redirecting...
            </div>
          )}
          {activeTab === 'signup' ? (
            <form onSubmit={handleSignUpSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane.doe@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="jane"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I accept the{' '}
                  <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                    Terms of Service
                  </a>{' '}
                  and the{' '}
                  <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="login-email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="jane.doe@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Enter your password..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
