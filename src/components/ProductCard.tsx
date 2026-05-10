import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  date: string;
}

export function ProductSkeleton() {
  return (
    <div className="card-container overflow-hidden h-full animate-pulse">
      <div className="bg-muted aspect-video w-full"></div>
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="h-6 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/4"></div>
        <div className="h-10 bg-muted rounded w-full mt-2"></div>
        <div className="mt-auto pt-4 border-t border-border">
          <div className="h-10 bg-muted rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card-container overflow-hidden h-full flex flex-col">
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full aspect-video object-cover bg-muted"
        loading="lazy"
      />
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
          <span className="font-bold text-primary whitespace-nowrap">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="px-2 py-1 bg-muted rounded-md">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-accent-500 text-accent-500" />
            <span className="font-medium text-foreground">{product.rating}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-border">
          <Link to={`/product/${product.id}`} className="btn-outline w-full block text-center">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}