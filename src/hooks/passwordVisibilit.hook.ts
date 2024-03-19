import { useState } from "react";

export function usePasswordVisibility(): {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
} {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return { showPassword, togglePasswordVisibility };
}
