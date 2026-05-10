import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, MapPin, Calendar, Tag, AlertCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../components/ProductCard';
import api from '../api/axios';

const relatedProducts: Product[] = Array.from({ length: 4 }, (_, i) => ({
  id: `related-${i}`,
  title: `Related Product ${i + 1}`,
  description: 'A great companion or alternative product.',
  price: 99.99 + i * 20,
  rating: 4.5,
  category: 'Electronics',
  image: `https://placehold.co/400x300/png?text=Related+${i + 1}`,
  date: new Date().toISOString(),
}));


export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/items/${id}`);
        const item = response.data;
        
        setProduct({
          ...item,
          id: item._id,
          title: item.title || 'Untitled Product',
          price: item.price || 0,
          category: item.category || 'Uncategorized',
          image: item.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800',
          rating: Number(item.rating) || 0,
          date: item.createdAt || new Date().toISOString(),
          description: item.description || 'No description available.',
        });
      } catch (err: any) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="section-padding bg-background min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="section-padding bg-background min-h-screen flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">{error || 'The product you are looking for does not exist.'}</p>
        <Link to="/explore" className="btn-primary">Back to Explore</Link>
      </div>
    );
  }

  return (
    <div className="section-padding bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">Home</Link> <span className="mx-2">/</span> 
        <Link to="/explore" className="hover:text-primary">Explore</Link> <span className="mx-2">/</span> 
        <span className="text-foreground">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="rounded-xl overflow-hidden border border-border bg-muted aspect-square lg:aspect-auto h-full flex items-center justify-center">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Star className="w-4 h-4 fill-accent-500 text-accent-500" />
              {product.rating} (128 Reviews)
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <div className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</div>

          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Key Specifications */}
          <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-muted/20 border border-border rounded-xl">
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Category</div>
                <div className="font-medium">{product.category}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Location</div>
                <div className="font-medium">Ships Worldwide</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Listed Date</div>
                <div className="font-medium">{new Date(product.date).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-accent-500" />
              <div>
                <div className="text-xs text-muted-foreground">Condition</div>
                <div className="font-medium">Brand New</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button className="btn-primary flex-1 h-14 text-lg gap-2">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button className="btn-outline h-14 px-8 gap-2">
              <Heart className="w-5 h-5" /> Save
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((rev) => (
            <div key={rev} className="card-container p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    U{rev}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">User {rev}</h4>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                </div>
                <div className="flex text-accent-500">
                  <Star className="w-4 h-4 fill-accent-500" />
                  <Star className="w-4 h-4 fill-accent-500" />
                  <Star className="w-4 h-4 fill-accent-500" />
                  <Star className="w-4 h-4 fill-accent-500" />
                  <Star className="w-4 h-4 fill-accent-500" />
                </div>
              </div>
              <p className="text-sm text-foreground">
                Absolutely phenomenal product. Exceeded my expectations in every way possible.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Items */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}