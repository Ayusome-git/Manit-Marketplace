import { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { Search, ShoppingBag, Heart, User, MessageCircle, PlusCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import { useCommandStore } from '@/store/useCommandStore';
import { motion, AnimatePresence } from 'motion/react';
import { getProductImageUrl } from './ui/smart-image';

export function CommandPalette() {
  const { isOpen, setOpen, toggleOpen } = useCommandStore();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const { Products } = useProductStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleOpen();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggleOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const filteredProducts = Products?.filter(p => 
    p.name.toLowerCase().includes(inputValue.toLowerCase()) || 
    p.category.toLowerCase().includes(inputValue.toLowerCase())
  ).slice(0, 5) || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <Command.Dialog 
          open={isOpen} 
          onOpenChange={setOpen}
          label="Global Command Menu"
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh]"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm" 
            onClick={() => setOpen(false)} 
          />

          {/* Dialog */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="z-50 w-[90vw] max-w-[640px] overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl"
          >
            <Command className="flex flex-col h-full w-full bg-transparent">
              <div className="flex items-center border-b border-border/50 px-4">
                <Search className="mr-3 size-5 text-muted-foreground shrink-0" />
                <Command.Input 
                  autoFocus 
                  placeholder="Type a command or search products..." 
                  className="flex h-14 w-full bg-transparent py-3 text-lg outline-none placeholder:text-muted-foreground/60 text-foreground"
                  value={inputValue}
                  onValueChange={setInputValue}
                />
                <button 
                  onClick={() => setOpen(false)}
                  className="ml-2 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                {inputValue.length > 0 && filteredProducts.length > 0 && (
                  <Command.Group heading="Products" className="text-xs font-medium text-muted-foreground px-2 py-1.5">
                    {filteredProducts.map((product) => (
                      <Command.Item 
                        key={product.productId}
                        onSelect={() => runCommand(() => navigate(`/product/${product.productId}`))}
                        className="flex cursor-pointer items-center rounded-xl px-3 py-3 text-sm aria-selected:bg-primary/10 aria-selected:text-primary transition-colors mt-1"
                      >
                        <div className="size-8 rounded-md bg-muted overflow-hidden mr-3 shrink-0">
                          {getProductImageUrl(product) && (
                            <img src={getProductImageUrl(product) || ""} alt="" className="size-full object-cover" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{product.name}</span>
                          <span className="text-xs text-muted-foreground">₹{product.price} • {product.category}</span>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                <Command.Group heading="Suggestions" className="text-xs font-medium text-muted-foreground px-2 py-1.5 mt-2">
                  <Command.Item 
                    onSelect={() => runCommand(() => navigate('/products'))}
                    className="flex cursor-pointer items-center rounded-xl px-3 py-3 text-sm aria-selected:bg-muted transition-colors mt-1"
                  >
                    <ShoppingBag className="mr-3 size-4 shrink-0 text-muted-foreground" />
                    <span className="text-foreground font-medium">Browse Marketplace</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => navigate('/profile/add-product'))}
                    className="flex cursor-pointer items-center rounded-xl px-3 py-3 text-sm aria-selected:bg-muted transition-colors mt-1"
                  >
                    <PlusCircle className="mr-3 size-4 shrink-0 text-muted-foreground" />
                    <span className="text-foreground font-medium">Sell an Item</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Profile" className="text-xs font-medium text-muted-foreground px-2 py-1.5 mt-2">
                  <Command.Item 
                    onSelect={() => runCommand(() => navigate('/profile/myads'))}
                    className="flex cursor-pointer items-center rounded-xl px-3 py-3 text-sm aria-selected:bg-muted transition-colors mt-1"
                  >
                    <User className="mr-3 size-4 shrink-0 text-muted-foreground" />
                    <span className="text-foreground font-medium">My Listings</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => navigate('/profile/wishlist'))}
                    className="flex cursor-pointer items-center rounded-xl px-3 py-3 text-sm aria-selected:bg-muted transition-colors mt-1"
                  >
                    <Heart className="mr-3 size-4 shrink-0 text-muted-foreground" />
                    <span className="text-foreground font-medium">Saved Items</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => navigate('/chat'))}
                    className="flex cursor-pointer items-center rounded-xl px-3 py-3 text-sm aria-selected:bg-muted transition-colors mt-1"
                  >
                    <MessageCircle className="mr-3 size-4 shrink-0 text-muted-foreground" />
                    <span className="text-foreground font-medium">Messages</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
              
              <div className="border-t border-border/50 bg-muted/20 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Use <kbd className="font-sans px-1.5 py-0.5 rounded-md bg-muted border border-border text-[10px]">↑</kbd> <kbd className="font-sans px-1.5 py-0.5 rounded-md bg-muted border border-border text-[10px]">↓</kbd> to navigate</span>
                  <span className="ml-2">Use <kbd className="font-sans px-1.5 py-0.5 rounded-md bg-muted border border-border text-[10px]">Enter</kbd> to select</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}
