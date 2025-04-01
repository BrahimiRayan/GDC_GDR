// composables/useTheme.ts
export const useTheme = () => {
    const isDark = ref(false);
  
    // Initialize from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      // 1. Check localStorage first
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        isDark.value = savedTheme === 'dark';
      } 
      // 2. Fallback to system preference ONLY if localStorage is empty
      else {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
  
      // 3. Apply the class to <html>
      document.documentElement.classList.toggle('dark', isDark.value);
    }
  
    // Toggle function (unchanged)
    const toggleTheme = () => {
      isDark.value = !isDark.value;
      document.documentElement.classList.toggle('dark', isDark.value);
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    };
  
    return { isDark, toggleTheme };
  };