'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  Activity,
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-core';
import { useGsapContext } from '@/lib/animations/useGsapContext';

interface CinemaScene {
  id: string;
  timecode: string;
  title: string;
  subtitle: string;
  location: string;
  telemetry: string;
  videoUrl: string;
  image: string;
  details: string[];
}

const CINEMA_SCENES: CinemaScene[] = [
  {
    id: 'scene-1',
    timecode: '05:15 AM',
    title: 'Digbeth Central Hub — Morning Dispatch Sequence',
    subtitle: 'Dual-Temperature Mercedes-Benz Sprinter fleet launching from Birmingham depot.',
    location: 'Loading Bay 07, Digbeth Wholesale Hub, Birmingham (B5 5JR)',
    telemetry: 'Vault Hold: +2.2°C Calibrated | GPS Live Telematics',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Cars_driving_at_night.webm',
    image: '/images/branded/rootwills_cinematic_depot_reel.jpg',
    details: [
      'Dual-temp refrigerated compartmentalisation (+2.0°C / +4.0°C)',
      'Time-stamped digital temperature audit logs on vehicle departure',
      'Automated routing across Midlands Michelin & boutique hospitality corridors',
    ],
  },
  {
    id: 'scene-2',
    timecode: '06:00 AM',
    title: 'Executive Kitchen Handover & Crate Inspection',
    subtitle: 'Direct cold-room drop with zero thermal breaks before morning prep.',
    location: 'Michelin-Recommended Restaurant Kitchen, Birmingham',
    telemetry: '06:00 AM Guaranteed SLA | Zero-Substitution Policy',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/24_Hours_With_A_Japanese_Izakaya_Chef-_Torasho_Ramen_%26_Charcoal_Bar.webm',
    image: '/images/branded/rootwills_hero_chef_delivery.jpg',
    details: [
      'Head chef physical handover with digital invoice sign-off',
      '100% Class 1 Extra-Select fruit and heritage vegetables',
      'Living root herbs delivered in clean nutrient hydration pads',
    ],
  },
  {
    id: 'scene-3',
    timecode: '04:30 AM',
    title: 'Wholesale Market & Estate Sorting',
    subtitle: 'Direct farm-to-depot transfer with non-destructive optical quality inspection.',
    location: 'Kent & Single-Estate European Orchards / Wholesale Terminal',
    telemetry: '14.8° Brix Natural Sugar Density | 0 Intermediate Storage',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Market_for_food_stuff_1.webm',
    image: '/images/branded/rootwills_orchard_harvest.jpg',
    details: [
      'Daily sunrise picking schedule with non-invasive sugar refraction',
      'Direct farm-to-depot transfer within 8 hours of harvest',
      'Full farm-to-fork batch traceability and SALSA certification',
    ],
  },
];

export function InteractiveLogisticsHub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerFrameRef = useRef<HTMLDivElement>(null);

  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const currentScene = CINEMA_SCENES[activeSceneIdx];

  // Video source switch and autoplay
  useEffect(() => {
    setVideoLoaded(false);
    setVideoError(false);
    setPlaybackProgress(0);

    const video = videoRef.current;
    if (video) {
      video.load();
      if (isPlaying) {
        video.play().catch(() => {
          // Autoplay policy fallback: mute and retry
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => setVideoError(true));
        });
      }
    }
  }, [activeSceneIdx, isPlaying]);

  // Handle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  // Handle mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!playerFrameRef.current) return;
    if (!document.fullscreenElement) {
      playerFrameRef.current.requestFullscreen().catch((err) => console.warn('Fullscreen error:', err));
    } else {
      document.exitFullscreen().catch((err) => console.warn('Exit fullscreen error:', err));
    }
  };

  // Time update
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setPlaybackProgress((video.currentTime / video.duration) * 100);
    }
  };

  // GSAP animation reveal
  useGsapContext(containerRef, (ctx) => {
    if (!triggerRef.current) return;

    try {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
      });

      tl.from('.cinema-header-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      })
      .from('.cinema-screen-frame', {
        scale: 0.96,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
      }, '-=0.6')
      .from('.cinema-telemetry-hud', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5');

    } catch (e) {
      console.warn('Cinema reel GSAP fallback:', e);
    }
  });

  return (
    <section ref={containerRef} className="relative w-full py-20 bg-obsidian-950 border-t border-emerald-900/50 overflow-hidden z-10">
      
      {/* Background Volumetric Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div ref={triggerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-emerald-950/80">
          <div className="space-y-3 max-w-2xl cinema-header-reveal">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Broadcast Documentary &bull; 4K DCI Video Reel</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream uppercase leading-[1.05]">
              The Cold-Chain <span className="gold-gradient-text">Logistics Operation</span>
            </h2>

            <p className="text-sm sm:text-base text-cream/80 font-sans leading-relaxed">
              Step inside the Rootwills daily wholesale network. From 4:30 AM single-estate harvesting to early 06:00 AM delivery drops across the Midlands’ leading commercial kitchens.
            </p>
          </div>

          {/* Broadcast Status Pill */}
          <div className="cinema-header-reveal flex items-center gap-3 bg-obsidian-900/90 p-3 rounded-2xl border border-emerald-900/80 font-mono text-xs shadow-xl backdrop-blur-md">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-cream/90 font-bold uppercase tracking-wider">REC &bull; LIVE OPERATION</span>
            <span className="text-cream/40">&bull;</span>
            <span className="text-champagne font-bold">24.00 FPS CINEMA</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 21:9 ANAMORPHIC CINEMA WIDESCREEN PLAYER */}
        {/* ========================================================================= */}
        <div 
          ref={playerFrameRef}
          className="cinema-screen-frame relative rounded-3xl p-2 bg-gradient-to-br from-emerald-500/40 via-emerald-900/50 to-champagne/30 border border-champagne/40 shadow-[0_30px_100px_rgba(2,23,16,0.98),0_0_60px_rgba(16,185,129,0.3)] overflow-hidden"
        >
          
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-obsidian-950 group">
            
            {/* Real HTML5 Streaming Video Player with Progressive Buffering */}
            <video
              ref={videoRef}
              key={currentScene.videoUrl}
              playsInline
              autoPlay
              loop
              muted={isMuted}
              preload="metadata"
              poster={currentScene.image}
              onCanPlay={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
              onTimeUpdate={handleTimeUpdate}
              className={`absolute inset-0 w-full h-full object-cover brightness-95 contrast-[1.05] transition-opacity duration-700 ${
                videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src={currentScene.videoUrl} type="video/webm" />
            </video>

            {/* High-Resolution Cinematic Poster Fallback (while video buffers or on low-power mode) */}
            <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
              videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
            }`}>
              <Image
                src={currentScene.image}
                alt={currentScene.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover brightness-95 contrast-[1.05]"
              />
            </div>

            {/* Cinematic Film Vignette & Anamorphic Grading Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/95 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,23,16,0.85)_100%)] pointer-events-none" />

            {/* Playback Progress Indicator Line */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-obsidian-900/80 z-30">
              <div 
                className="h-full bg-gradient-to-r from-champagne-soft via-champagne to-champagne shadow-gold-glow transition-all duration-200"
                style={{ width: `${playbackProgress}%` }}
              />
            </div>

            {/* Top Broadcast Timecode & Camera HUD */}
            <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 flex items-center justify-between text-xs font-mono text-cream/90 z-20 pointer-events-none">
              <div className="flex items-center gap-2 bg-obsidian-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-champagne/40 text-champagne font-bold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{currentScene.timecode} &bull; {currentScene.telemetry}</span>
              </div>

              <div className="hidden sm:flex items-center gap-3 bg-obsidian-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-900/80 text-cream/80">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentScene.location}</span>
              </div>
            </div>

            {/* Lower-Third Documentary Information Card */}
            <div className="absolute bottom-5 sm:bottom-6 inset-x-4 sm:inset-x-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              
              <div className="space-y-2 max-w-xl bg-obsidian-950/90 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-emerald-900/80 shadow-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-champagne font-bold">
                    Rootwills Field Reel &bull; Scene 0{activeSceneIdx + 1} of 03
                  </span>
                  {videoLoaded && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold uppercase">
                      STREAMING
                    </span>
                  )}
                </div>
                
                <h3 className="font-display text-lg sm:text-2xl font-bold text-cream leading-tight">
                  {currentScene.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-cream/80 font-sans leading-relaxed">
                  {currentScene.subtitle}
                </p>

                {/* Key Bullet Points */}
                <div className="hidden sm:flex flex-wrap gap-2 pt-1">
                  {currentScene.details.map((detail, dIdx) => (
                    <div key={dIdx} className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Player Controls */}
              <div className="flex items-center gap-2 self-end sm:self-auto bg-obsidian-950/90 backdrop-blur-xl p-2 rounded-2xl border border-champagne/40 shadow-2xl">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause cinematic reel" : "Play cinematic reel"}
                  className="p-3 rounded-xl bg-champagne text-obsidian-950 hover:brightness-110 shadow-gold-glow transition-all"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  className="p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-cream border border-emerald-800/60 transition-all"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-cream/70" /> : <Volume2 className="w-4 h-4 text-champagne" />}
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label="Fullscreen view"
                  className="p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-cream border border-emerald-800/60 transition-all hidden sm:block"
                >
                  <Maximize2 className="w-4 h-4 text-cream/70" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Scene Selector Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CINEMA_SCENES.map((scene, idx) => {
            const isActive = idx === activeSceneIdx;
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => {
                  setActiveSceneIdx(idx);
                  setIsPlaying(true);
                }}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 space-y-2 relative overflow-hidden group ${
                  isActive 
                    ? 'bg-emerald-950/80 border-champagne shadow-[0_0_25px_rgba(228,199,103,0.2)]' 
                    : 'bg-obsidian-900/60 border-emerald-900/50 hover:border-emerald-700/60 hover:bg-obsidian-900/90'
                }`}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim shadow-gold-glow" />
                )}

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={isActive ? 'text-champagne font-bold' : 'text-cream/50'}>
                    Scene 0{idx + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    {scene.timecode}
                  </span>
                </div>

                <h4 className="font-display text-sm font-bold text-cream line-clamp-1 group-hover:text-champagne transition-colors">
                  {scene.title}
                </h4>

                <p className="text-xs text-cream/70 line-clamp-2 font-sans">
                  {scene.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Bottom CTA Strip */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-emerald-950/40 border border-emerald-900/60">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono uppercase text-champagne font-bold">Live Wholesale Account Desk</span>
            <p className="text-sm font-bold text-cream">Experience guaranteed 6am fresh produce delivery in your kitchen.</p>
          </div>

          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs font-mono shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all"
          >
            <span>Open 30-Day Trade Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </section>
  );
}
