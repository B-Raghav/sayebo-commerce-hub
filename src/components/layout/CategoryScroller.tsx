
import { Card } from "@/components/ui/card";

const CategoryScroller = () => {
  const categories = [
    { name: 'Electronics', icon: '📱', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'Fashion', icon: '👕', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { name: 'Home & Garden', icon: '🏡', color: 'bg-green-50 text-green-700 border-green-200' },
    { name: 'Books', icon: '📚', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { name: 'Sports', icon: '⚽', color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { name: 'Beauty', icon: '💄', color: 'bg-pink-50 text-pink-700 border-pink-200' },
    { name: 'Health', icon: '💊', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { name: 'Automotive', icon: '🚗', color: 'bg-gray-50 text-gray-700 border-gray-200' },
  ];

  return (
    <div className="bg-white py-8 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <Card 
              key={category.name}
              className={`flex-shrink-0 w-28 h-28 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1 border ${category.color}`}
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
