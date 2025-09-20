import { 
  Home, 
  CheckCircle, 
  Code, 
  BookOpen, 
  Mail, 
  Briefcase, 
  Terminal, 
  Shield, 
  Smartphone, 
  Cpu, 
  GraduationCap, 
  Calendar, 
  Award, 
  Book, 
  Rocket, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin,
  User,
  Building,
  Receipt,
  ShoppingBag,
  Car,
  Wrench,
  Leaf,
  CreditCard,
  Zap,
  Lightbulb
} from "lucide-react"
import { 
  FaReact, 
  FaJs, 
  FaNodeJs, 
  FaPython, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter 
} from 'react-icons/fa'
import { SiTypescript } from 'react-icons/si'

const iconMap: Record<string, any> = {
  // Lucide Icons
  Home,
  CheckCircle,
  Code,
  BookOpen,
  Mail,
  Briefcase,
  Terminal,
  Shield,
  Smartphone,
  Cpu,
  GraduationCap,
  Calendar,
  Award,
  Book,
  Rocket,
  MapPin,
  Phone,
  Github,
  Linkedin,
  User,
  Building,
  Receipt,
  ShoppingBag,
  Car,
  Wrench,
  Leaf,
  CreditCard,
  Zap,
  Lightbulb,
  // FontAwesome Icons
  FaReact,
  FaJs,
  FaNodeJs,
  FaPython,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  // Simple Icons
  SiTypescript
}

export const resolveIcon = (iconName: string) => {
  return iconMap[iconName] || HelpCircle
}

import { HelpCircle } from "lucide-react"
