import { Laptop, BookOpen, Sofa, Shirt, Bike, Car, Grid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useRef } from "react";

export function CategoryList() {
  const nav = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const categories = [
    { name: "Electronics", icon: Laptop },
    { name: "Study Materials", icon: BookOpen },
    { name: "Hostel Essentials", icon: Sofa },
    { name: "Clothing", icon: Shirt },
    { name: "Sports", icon: Bike },
    { name: "Vehicles", icon: Car },
    { name: "Miscellaneous", icon: Grid },
  ];

  return (
    <section className="font-sans container mx-auto px-4 sm:px-8 md:px-12 lg:px-32 mb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Explore Categories</h2>
          <p className="text-muted-foreground mt-1">Find exactly what you're looking for on campus.</p>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, idx) => (
          <motion.div 
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            onClick={() => nav(`/products?category=${encodeURIComponent(category.name)}`)}
            className="flex-shrink-0 w-[140px] h-[140px] flex flex-col items-center justify-center p-4 rounded-3xl bg-card border border-border/50 hover:border-primary/40 hover:bg-primary/[0.03] hover:shadow-lg hover:shadow-primary/5 cursor-pointer transition-all duration-300 group snap-center"
          >
            <motion.div 
              className="size-14 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
              whileHover={{ scale: 1.1, rotate: [-5, 5, 0] }}
            >
              <category.icon className="size-6 transition-transform duration-300" />
            </motion.div>
            <span className="text-sm font-semibold text-center text-foreground group-hover:text-primary transition-colors">{category.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
