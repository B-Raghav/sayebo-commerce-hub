
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  image: string;
  rating?: number;
  reviews?: number;
  sellerId: string;
  stock?: number;
}

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}

const ProductCard = ({ product, showActions = false, onEdit, onDelete, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            -{product.discount}%
          </Badge>
        )}
        {!showActions && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 h-8 w-8 opacity-80 hover:opacity-100"
          >
            <Heart className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{product.rating}</span>
              {product.reviews && (
                <span className="text-xs text-gray-400">({product.reviews})</span>
              )}
            </div>
          )}
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
          {product.title}
        </h3>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-600">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        
        {showActions ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit?.(product)}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete?.(product.id)}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button 
                className="flex-1" 
                size="sm"
                onClick={() => onAddToCart?.(product.id)}
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add to Cart
              </Button>
              <Button size="sm" variant="outline" className="px-3">
                Buy Now
              </Button>
            </div>
            
            {product.stock !== undefined && (
              <div className="text-xs text-center">
                {product.stock > 0 ? (
                  <span className="text-green-600">{product.stock} in stock</span>
                ) : (
                  <span className="text-red-600">Out of stock</span>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
