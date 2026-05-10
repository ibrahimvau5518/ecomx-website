import { useState, useMemo, useEffect } from 'react';
import ProductCard, { ProductSkeleton } from '../components/ProductCard';
import type { Product } from '../components/ProductCard';
import api from '../api/axios';

const ITEMS_PER_PAGE = 12;

const Explore: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('newest'); // newest, price-asc, price-desc, rating
  const [currentPage, setCurrentPage] = useState(1);

  // When filters or sorts change, reset the page to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, minRating, sort]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use a clean URL without manual timestamp first to test standard behavior
        const response = await api.get('/api/items', {
          params: {
            limit: 100,
            _t: Date.now() // Standard way to bypass simple caches
          }
        });
        
        const rawItems = response.data.items || [];
        
        // Map backend _id to id and ensure all fields are present for UI stability
        const mappedItems = rawItems.map((item: any) => ({
          ...item,
          id: item._id,
          title: item.title || 'Untitled Product',
          price: item.price || 0,
          category: item.category || 'Uncategorized',
          image: item.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800',
          rating: Number(item.rating) || 0,
          date: item.createdAt || new Date().toISOString()
        }));
        
        setProducts(mappedItems);
        // Persist to local storage as a fallback to prevent "disappearing on refresh"
        localStorage.setItem('ecomx_products_cache', JSON.stringify(mappedItems));
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(`Failed to load products: ${err.message}`);
        
        // Try to load from local storage cache if API fails (e.g. on quick refresh)
        const cached = localStorage.getItem('ecomx_products_cache');
        if (cached) {
          setProducts(JSON.parse(cached));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['All', ...Array.from(cats)].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter((p) => 
        (p.title && p.title.toLowerCase().includes(searchLower)) || 
        (p.description && p.description.toLowerCase().includes(searchLower))
      );
    }
    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }
    if (minRating > 0) {
      result = result.filter((p) => (p.rating || 0) >= minRating);
    }

    result.sort((a, b) => {
      switch (sort) {
        case 'price-asc': return (a.price || 0) - (b.price || 0);
        case 'price-desc': return (b.price || 0) - (a.price || 0);
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        case 'newest':
        default: {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        }
      }
    });

    return result;
  }, [products, search, category, minRating, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="section-padding bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Explore Products</h1>
        <p className="text-muted-foreground">Find exactly what you are looking for.</p>
        {error && <p className="text-amber-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="card-container p-4 border border-border rounded-lg">
            <h2 className="font-semibold text-lg mb-4 cursor-pointer">Search</h2>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="input-field mb-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="card-container p-4 border border-border rounded-lg">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            
            {/* Category Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Category</label>
              <select className="input-field cursor-pointer" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Minimum Rating</label>
              <select className="input-field cursor-pointer" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
                <option value="0">Any Rating</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar Sort */}
          <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border mb-6">
            <span className="text-sm font-medium text-muted-foreground">
              Showing {paginatedProducts.length} of {filteredProducts.length} results
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline-block">Sort by:</span>
              <select className="input-field w-auto min-w-[150px] cursor-pointer" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 flex-1">
             {loading ? (
               Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)
             ) : paginatedProducts.length > 0 ? (
               paginatedProducts.map(product => <ProductCard key={product.id} product={product} />)
             ) : (
               <div className="col-span-full py-20 text-center text-muted-foreground">
                 No products found matching your criteria.
               </div>
             )}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-auto pb-4">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn-outline w-24 h-10"
              >
                Previous
              </button>
              <div className="flex items-center justify-center min-w-[3rem] px-2 text-sm font-medium">
                {currentPage} / {totalPages}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn-outline w-24 h-10"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;