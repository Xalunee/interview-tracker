import {
  CtaSection,
  FaqSection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  LandingAnimationInit,
  LandingFooter,
  LandingNav,
  ProblemSection,
  ShowcaseSection,
  SocialProofSection,
} from '@/widgets/landing-sections';

export default function HomePage() {
  return (
    <>
      <LandingAnimationInit />
      <LandingNav />
      <main>
        <HeroSection />
        <SocialProofSection />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ShowcaseSection />
        <FaqSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </>
  );
}
