import { useState, type MouseEvent, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { computeCursorTilt } from '../utils/portfolioLogic';

interface InteractiveTiltCardProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  maxTilt?: number;
  hoverLiftY?: number;
  testId?: string;
}

const TILT_SPRING = { stiffness: 260, damping: 24, mass: 0.6 };

export function InteractiveTiltCard({
  children,
  className = '',
  wrapperClassName = '',
  maxTilt = 4,
  hoverLiftY = -4,
  testId,
}: InteractiveTiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const targetRotateX = useMotionValue(0);
  const targetRotateY = useMotionValue(0);
  const targetNormX = useMotionValue(0.5);
  const targetNormY = useMotionValue(0.5);

  const rotateX = useSpring(targetRotateX, TILT_SPRING);
  const rotateY = useSpring(targetRotateY, TILT_SPRING);
  const smoothNormX = useSpring(targetNormX, TILT_SPRING);
  const smoothNormY = useSpring(targetNormY, TILT_SPRING);

  const sheenX = useTransform(smoothNormX, [0, 1], ['-25%', '25%']);
  const sheenY = useTransform(smoothNormY, [0, 1], ['-25%', '25%']);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const normX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const normY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    const tilt = computeCursorTilt(normX, normY, maxTilt);

    targetRotateX.set(tilt.rotateX);
    targetRotateY.set(tilt.rotateY);
    targetNormX.set(normX);
    targetNormY.set(normY);
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetRotateX.set(0);
    targetRotateY.set(0);
    targetNormX.set(0.5);
    targetNormY.set(0.5);
  };

  return (
    <div
      className={wrapperClassName}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        data-testid={testId}
        data-hovered={isHovered ? 'true' : 'false'}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={prefersReducedMotion ? undefined : { y: hoverLiftY }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
        className={`relative ${className}`}
      >
        {children}

        {/* Soft Metallic Cursor-Following Light Reflection */}
        <motion.div
          aria-hidden="true"
          data-testid={testId ? `${testId}-sheen` : undefined}
          animate={{ opacity: isHovered && !prefersReducedMotion ? 1 : 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] z-20"
        >
          <motion.span
            style={{ x: sheenX, y: sheenY }}
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
          >
            <span
              className="block w-full h-full"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(255, 255, 255, 0.36) 0%, rgba(226, 232, 240, 0.16) 20%, rgba(244, 114, 182, 0.08) 34%, transparent 56%)',
              }}
            />
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
}
