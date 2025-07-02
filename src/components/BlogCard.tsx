import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface BlogCardProps {
  blog: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{blog.author}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
        
        <Link
          to={`/blog/${blog.id}`}
          className="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
        >
          <span>Read More</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;