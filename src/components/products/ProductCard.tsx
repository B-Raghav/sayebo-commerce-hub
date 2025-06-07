
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sellerId: string;
}

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

const ProductCard = ({ product, showActions = false, onEdit, onDelete }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <span className="text-lg font-bold text-green-600">
            ${product.price}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        
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
          <Button className="w-full" size="sm">
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
