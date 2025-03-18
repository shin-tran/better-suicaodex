// src/components/Pages/AdvancedSearch/authors-selector.tsx
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { SearchAuthor, SearchAuthorByIds } from "@/lib/mangadex/author";
import { AsyncMultiSelect } from "@/components/ui/async-multi-select";
import { cn } from "@/lib/utils";
import { Author } from "@/types/types";

interface AuthorOption {
  value: string;
  label: string;
}

interface AuthorsSelectorProps {
  defaultValue?: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  isCompact?: boolean;
  disableFooter?: boolean;
  showSelectedValue?: boolean;
}

export const AuthorsSelector: React.FC<AuthorsSelectorProps> = ({
  defaultValue = [],
  onValueChange,
  placeholder = "Select authors",
  className,
  isCompact = false,
  disableFooter = false,
  showSelectedValue = false,
}) => {
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>(defaultValue);
  const [authorOptions, setAuthorOptions] = useState<AuthorOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialOptionsLoaded, setInitialOptionsLoaded] = useState(false);

  // Load initial author data for the default values
  useEffect(() => {
    const loadInitialAuthors = async () => {
      if (defaultValue.length === 0) {
        setInitialOptionsLoaded(true);
        return;
      }
      
      try {
        setIsLoading(true);
        const authorsData = await SearchAuthorByIds(defaultValue);
        
        const options = authorsData.map((author: Author) => ({
          value: author.id,
          label: author.name,
        }));
        
        setAuthorOptions(options);
        setInitialOptionsLoaded(true);
      } catch (error) {
        console.error("Error loading initial authors:", error);
        setInitialOptionsLoaded(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialAuthors();
  }, [defaultValue]);

  const handleAuthorSearch = async (query: string): Promise<AuthorOption[]> => {
    try {
      // If query is empty and we have pre-loaded author options, return those
      if (!query && authorOptions.length > 0) {
        return authorOptions;
      }
      
      const data = await SearchAuthor(query);
      
      // Create new options from search results
      const newOptions = data.map((author) => ({
        value: author.id,
        label: author.name,
      }));
      
      // Update our cached author options with any new ones
      if (newOptions.length > 0) {
        const uniqueNewOptions = newOptions.filter(
          (newOpt) => !authorOptions.some((opt) => opt.value === newOpt.value)
        );
        
        if (uniqueNewOptions.length > 0) {
          setAuthorOptions((prev) => [...prev, ...uniqueNewOptions]);
        }
      }
      
      return newOptions;
    } catch (error) {
      console.error("Error searching for authors:", error);
      return [];
    }
  };

  const handleValueChange = (ids: string[]) => {
    setSelectedAuthorIds(ids);
    onValueChange(ids);
  };

  // Don't render until initial options are loaded to prevent flicker
  if (!initialOptionsLoaded && defaultValue.length > 0) {
    return null;
  }

  return (
    <AsyncMultiSelect
      loadOptions={handleAuthorSearch}
      onValueChange={handleValueChange}
      defaultValue={selectedAuthorIds}
      className={cn("shadow-none", className)}
      disableFooter={disableFooter}
      isCompact={isCompact}
      showSelectedValue={showSelectedValue}
      placeholder={placeholder}
      noResultsMessage="Không có kết quả"
      loadingMessage="Đang tìm..."
      preloadedOptions={authorOptions}
    />
  );
};