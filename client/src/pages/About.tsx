import { useState } from 'react';
import SoftBackdrop from '../components/SoftBackdrop';
import { Zap, Sparkles, Palette } from 'lucide-react';

const About = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <SoftBackdrop />
      <section className="relative min-h-screen text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - About Section */}
            <div className="animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                About
              </h2>
              <h3 className="text-5xl md:text-6xl font-bold text-pink-500 mb-8">
                Thumblify
              </h3>
              
              <div className="space-y-6 text-gray-300">
                <p>
                  <span className="text-white font-semibold">Thumblify</span> is an AI-powered platform built to help creators design eye-catching, high-converting YouTube thumbnails in seconds - without needing advanced design skills.
                </p>
                
                <p>
                  In today's crowded creator economy, first impressions decide everything. A strong thumbnail can be the difference between getting ignored and getting clicked. Thumblify was created to remove the guesswork and turn proven design principles into automated, intelligent visuals.
                </p>
                
                <p>
                  Our AI analyzes composition, color contrast, facial focus, text placement, and visual hierarchy to help you generate thumbnails that naturally attract attention in YouTube feeds and recommendations.
                </p>
                
                {showMore && (
                  <div className="space-y-6 animate-fade-in">
                    <p>
                      Whether you're a solo content creator just starting out or part of a growing team producing dozens of videos per week, Thumblify scales with your needs. Our platform combines cutting-edge machine learning with intuitive design controls.
                    </p>
                    <p>
                      We believe that great design shouldn't require years of training or expensive software. That's why we've distilled the expertise of top YouTube thumbnail designers into an intelligent system that works for everyone.
                    </p>
                  </div>
                )}
                
                <button 
                  onClick={() => setShowMore(!showMore)}
                  className="text-pink-500 font-medium mt-4 hover:text-pink-400 transition-colors"
                >
                  {showMore ? 'Show Less' : 'Show More'}
                </button>
              </div>
            </div>

            {/* Right Column - Why Choose Us */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-pink-500/30 transition-all duration-300">
              <h3 className="text-3xl font-bold mb-8">Why Choose Us?</h3>
              
              <div className="space-y-8">
                {/* Lightning Fast */}
                <div className="flex gap-4 group cursor-pointer">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center group-hover:bg-pink-500/20 transition-all duration-300">
                      <Zap className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
                    <p className="text-gray-400">
                      Generate professional thumbnails in seconds, not hours.
                    </p>
                  </div>
                </div>

                {/* AI Powered */}
                <div className="flex gap-4 group cursor-pointer">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center group-hover:bg-pink-500/20 transition-all duration-300">
                      <Sparkles className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">AI Powered</h4>
                    <p className="text-gray-400">
                      Leverage state-of-the-art AI to optimize for clicks.
                    </p>
                  </div>
                </div>

                {/* Fully Customizable */}
                <div className="flex gap-4 group cursor-pointer">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center group-hover:bg-pink-500/20 transition-all duration-300">
                      <Palette className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Fully Customizable</h4>
                    <p className="text-gray-400">
                      Edit every detail to match your brand's unique style.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Built for Creators */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
              <h4 className="text-xl font-semibold mb-3">Built for Creators</h4>
              <p className="text-gray-400">
                Designed with real creator workflows in mind — from solo YouTubers to growing content teams.
              </p>
            </div>

            {/* AI + Human Control */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
              <h4 className="text-xl font-semibold mb-3">AI + Human Control</h4>
              <p className="text-gray-400">
                AI gives you the starting point. You stay in control with full customization and creative freedom.
              </p>
            </div>

            {/* Focused on Results */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
              <h4 className="text-xl font-semibold mb-3">Focused on Results</h4>
              <p className="text-gray-400">
                Every feature is built to help improve visibility, engagement, and long-term channel growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default About;