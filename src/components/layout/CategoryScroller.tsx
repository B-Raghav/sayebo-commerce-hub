
import { Card } from "@/components/ui/card";

const CategoryScroller = () => {
  const categories = [
    { name: 'Electronics', icon: '📱', color: 'bg-blue-100 text-blue-700' },
    { name: 'Fashion', icon: '👕', color: 'bg-pink-100 text-pink-700' },
    { name: 'Home & Kitchen', icon: '🏠', color: 'bg-green-100 text-green-700' },
    { name: 'Books', icon: '📚', color: 'bg-purple-100 text-purple-700' },
    { name: 'Sports', icon: '⚽', color: 'bg-orange-100 text-orange-700' },
    { name: 'Beauty', icon: '💄', color: 'bg-red-100 text-red-700' },
    { name: 'Toys', icon: '🧸', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Health', icon: '💊', color: 'bg-teal-100 text-teal-700' },
  ];

  return (
    <div className="bg-white py-8 border-b">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <Card 
              key={category.name}
              className={`flex-shrink-0 w-24 h-24 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${category.color}`}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <div className="text-xs text-center font-medium leading-tight">
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
