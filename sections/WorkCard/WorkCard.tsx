'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import './WorkCard.css';

export interface WorkCardProps {
  id: string;
  clientName: string;
  projectTitle: string;
  projectType?: string;
  thumbnailUrl?: string;
  thumbnailAspectRatio?: 'square' | 'tall' | 'story' | 'wide' | 'auto';
  heroMediaUrl?: string;
  heroMediaType?: 'image' | 'video';
  featured?: boolean;
  onClick: () => void;
  index?: number;
}

export default function WorkCard({
  id,
  clientName,
  projectTitle,
  projectType,
  thumbnailUrl,
  thumbnailAspectRatio = 'auto',
  heroMediaUrl,
  heroMediaType,
  featured,
  onClick,
  index = 0,
}: WorkCardProps) {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const imageUrl = thumbnailUrl || heroMediaUrl;
  const isVideo = heroMediaType === 'video' || (heroMediaUrl && heroMediaUrl.match(/\.(mp4|webm)$/i));
  
  // Validate URL - check if it's a valid, non-empty URL
  const isValidUrl = (url?: string): boolean => {
    if (!url || url.trim() === '') return false;
    // Check if it's a valid URL format or a valid path
    try {
      // If it starts with http/https, validate as URL
      if (url.startsWith('http://') || url.startsWith('https://')) {
        new URL(url);
        return true;
      }
      // If it's a relative path, check if it's not empty
      if (url.startsWith('/')) {
        return url.length > 1;
      }
      return true;
    } catch {
      return false;
    }
  };
  
  const hasValidMedia = isValidUrl(imageUrl) && !imageError && !videoError;
  
  // Reset states when URL changes
  useEffect(() => {
    setImageError(false);
    setVideoError(false);
    setImageLoaded(false);
  }, [imageUrl]);
  
  // Pre-validate image URL on mount (only for relative paths to avoid CORS issues)
  useEffect(() => {
    if (imageUrl && !isVideo && imageUrl.startsWith('/')) {
      // Only pre-validate relative paths to avoid CORS issues with external URLs
      const img = new window.Image();
      img.onerror = () => {
        setImageError(true);
      };
      img.onload = () => {
        setImageLoaded(true);
      };
      img.src = imageUrl;
    }
  }, [imageUrl, isVideo]);
  
  const getAspectRatioClass = () => {
    switch (thumbnailAspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'tall':
        return 'aspect-tall';
      case 'story':
        return 'aspect-story';
      case 'wide':
        return 'aspect-wide';
      default:
        return 'aspect-auto';
    }
  };

  return (
    <motion.div
      className={`work-card ${getAspectRatioClass()}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="work-card-media">
        {hasValidMedia ? (
          <>
            {isVideo ? (
              <>
                <video
                  ref={videoRef}
                  src={imageUrl!}
                  className="work-card-video"
                  muted={isMuted}
                  loop
                  playsInline
                  preload={index < 4 ? 'auto' : 'metadata'}
                  onError={() => {
                    setVideoError(true);
                    console.warn('Video failed to load:', imageUrl);
                  }}
                  onMouseEnter={() => {
                    videoRef.current?.play().catch(() => {});
                  }}
                  onMouseLeave={() => {
                    if (videoRef.current) {
                      videoRef.current.pause();
                      videoRef.current.currentTime = 0;
                    }
                  }}
                />
                <button
                  className="work-card-mute-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                    if (videoRef.current) {
                      videoRef.current.muted = !isMuted;
                    }
                  }}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  type="button"
                >
                  {isMuted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.03C15.5 15.29 16.5 13.77 16.5 12Z" fill="white"/>
                      <path d="M19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.62 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12Z" fill="white"/>
                      <path d="M3.27 4L2 5.27L7.73 11H3V13H7.73L12 17.27V20.73C12 21.5 12.5 22 13.27 22C13.55 22 13.82 21.92 14.05 21.77L16.73 19.09L19.73 22.09L21 20.82L3.27 4Z" fill="white"/>
                      <path d="M12 4L9.91 6.09L12 8.18V4Z" fill="white"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9V15H7L12 20V4L7 9H3Z" fill="white"/>
                      <path d="M16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.03C15.5 15.29 16.5 13.77 16.5 12Z" fill="white"/>
                      <path d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="white"/>
                    </svg>
                  )}
                </button>
              </>
            ) : (
              <>
                <Image
                  src={imageUrl!}
                  alt={projectTitle}
                  fill
                  className="work-card-image"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  onError={(e) => {
                    setImageError(true);
                    console.warn('Image failed to load:', imageUrl);
                  }}
                  onLoad={() => setImageLoaded(true)}
                  unoptimized
                />
                {!imageLoaded && (
                  <div className="work-card-image-loading">
                    <div className="work-card-loading-spinner" />
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="work-card-placeholder">
            <span>{projectTitle.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <div className="work-card-overlay">
          <div className="work-card-badges">
            {featured && (
              <span className="work-card-badge work-card-badge-featured">FEATURED</span>
            )}
            {clientName && (
              <span className="work-card-badge work-card-badge-client">{clientName}</span>
            )}
          </div>
          <div className="work-card-info">
            <h3 className="work-card-title">{projectTitle}</h3>
            {projectType && (
              <span className="work-card-type">{projectType}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

