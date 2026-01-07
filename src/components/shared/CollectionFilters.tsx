import { motion } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
}

interface CollectionFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export interface FilterState {
  style: string[];
  deliveryTime: string[];
  budget: string;
  language: string[];
  sortBy: string;
}

const styleOptions: FilterOption[] = [
  { value: 'Royal', label: 'Royal' },
  { value: 'Minimal', label: 'Minimal' },
  { value: 'Modern', label: 'Modern' },
  { value: 'Traditional', label: 'Traditional' },
  { value: 'Floral', label: 'Floral' },
  { value: 'Cinematic', label: 'Cinematic' },
];

const deliveryOptions: FilterOption[] = [
  { value: '24h', label: '24 Hours' },
  { value: '48h', label: '48 Hours' },
  { value: '72h', label: '72 Hours' },
];

const budgetOptions: FilterOption[] = [
  { value: 'under-1000', label: 'Under ₹1,000' },
  { value: '1000-3000', label: '₹1,000 - ₹3,000' },
  { value: 'above-3000', label: 'Above ₹3,000' },
];

const languageOptions: FilterOption[] = [
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'English', label: 'English' },
];

const sortOptions: FilterOption[] = [
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export default function CollectionFilters({ onFilterChange, currentFilters }: CollectionFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleFilter = (type: keyof Pick<FilterState, 'style' | 'deliveryTime' | 'language'>, value: string) => {
    const current = currentFilters[type] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...currentFilters, [type]: updated });
  };

  const setBudget = (value: string) => {
    onFilterChange({ ...currentFilters, budget: currentFilters.budget === value ? '' : value });
  };

  const setSort = (value: string) => {
    onFilterChange({ ...currentFilters, sortBy: value });
  };

  const clearFilters = () => {
    onFilterChange({
      style: [],
      deliveryTime: [],
      budget: '',
      language: [],
      sortBy: 'best-selling',
    });
  };

  const hasFilters = currentFilters.style.length > 0 || currentFilters.deliveryTime.length > 0 || currentFilters.budget || currentFilters.language.length > 0;

  const FilterSection = ({ title, children, id }: { title: string; children: React.ReactNode; id: string }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpenSection(openSection === id ? null : id)}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-sm">{title}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", openSection === id && "rotate-180")} />
      </button>
      {openSection === id && (
        <div className="px-4 pb-4 pt-1 flex flex-wrap gap-2">
          {children}
        </div>
      )}
    </div>
  );

  const FilterChip = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
        selected
          ? "bg-primary text-primary-foreground"
          : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="mb-6 md:mb-8">
      {/* Mobile Filter Toggle + Sort */}
      <div className="flex items-center gap-3 mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {hasFilters && (
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {currentFilters.style.length + currentFilters.deliveryTime.length + currentFilters.language.length + (currentFilters.budget ? 1 : 0)}
            </span>
          )}
        </Button>
        
        <div className="flex-1" />
        
        {/* Sort Dropdown */}
        <select
          value={currentFilters.sortBy}
          onChange={(e) => setSort(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-card border border-border rounded-xl overflow-hidden mb-6"
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="font-semibold">Filters</span>
            {hasFilters && (
              <button onClick={clearFilters} className="text-sm text-primary hover:underline flex items-center gap-1">
                <X className="w-3 h-3" /> Clear all
              </button>
            )}
          </div>

          <FilterSection title="Style" id="style">
            {styleOptions.map((option) => (
              <FilterChip
                key={option.value}
                selected={currentFilters.style.includes(option.value)}
                onClick={() => toggleFilter('style', option.value)}
              >
                {option.label}
              </FilterChip>
            ))}
          </FilterSection>

          <FilterSection title="Delivery Time" id="delivery">
            {deliveryOptions.map((option) => (
              <FilterChip
                key={option.value}
                selected={currentFilters.deliveryTime.includes(option.value)}
                onClick={() => toggleFilter('deliveryTime', option.value)}
              >
                {option.label}
              </FilterChip>
            ))}
          </FilterSection>

          <FilterSection title="Budget" id="budget">
            {budgetOptions.map((option) => (
              <FilterChip
                key={option.value}
                selected={currentFilters.budget === option.value}
                onClick={() => setBudget(option.value)}
              >
                {option.label}
              </FilterChip>
            ))}
          </FilterSection>

          <FilterSection title="Language" id="language">
            {languageOptions.map((option) => (
              <FilterChip
                key={option.value}
                selected={currentFilters.language.includes(option.value)}
                onClick={() => toggleFilter('language', option.value)}
              >
                {option.label}
              </FilterChip>
            ))}
          </FilterSection>
        </motion.div>
      )}

      {/* Active Filters Display */}
      {hasFilters && !isOpen && (
        <div className="flex flex-wrap gap-2 mb-4">
          {currentFilters.style.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              {s}
              <button onClick={() => toggleFilter('style', s)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {currentFilters.deliveryTime.map((d) => (
            <span key={d} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              {d}
              <button onClick={() => toggleFilter('deliveryTime', d)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {currentFilters.language.map((l) => (
            <span key={l} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              {l}
              <button onClick={() => toggleFilter('language', l)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {currentFilters.budget && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              {budgetOptions.find((b) => b.value === currentFilters.budget)?.label}
              <button onClick={() => setBudget(currentFilters.budget)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-primary underline">
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
