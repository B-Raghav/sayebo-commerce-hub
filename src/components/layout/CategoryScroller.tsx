
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const CategoryScroller = () => {
  const navigate = useNavigate();
  
  const categories = [
    { name: 'Fashion', icon: '👗', color: 'bg-pink text-pink-800 border-pink-300' },
    { name: 'Beauty', icon: '💄', color: 'bg-peach text-orange-800 border-orange-300' },
    { name: 'Jewelry', icon: '💎', color: 'bg-light-gold text-yellow-800 border-yellow-300' },
    { name: 'Home Decor', icon: '🏡', color: 'bg-blush-rose text-pink-800 border-pink-300' },
    { name: 'Handmade', icon: '✋', color: 'bg-muted-coral text-red-800 border-red-300' },
    { name: 'Books', icon: '📚', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    { name: 'Health', icon: '🌿', color: 'bg-green-100 text-green-800 border-green-300' },
    { name: 'Electronics', icon: '📱', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  ];

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="bg-white py-8 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <Card 
              key={category.name}
              className={`flex-shrink-0 w-28 h-28 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1 border ${category.color}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-xs text-center font-medium leading-tight px-2">
                {category.name}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryScroller;
