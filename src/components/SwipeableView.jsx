import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const SwipeableView = ({ index, onChangeIndex, children, axis = 'x' }) => {
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    const newIndex = index + newDirection;
    if (newIndex >= 0 && newIndex < React.Children.count(children)) {
      onChangeIndex(newIndex);
    }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence initial={false} custom={axis}>
        <motion.div
          key={index}
          custom={axis}
          initial={{ 
            [axis]: index >= 0 ? '100%' : '-100%',
            opacity: 0 
          }}
          animate={{ 
            [axis]: 0,
            opacity: 1 
          }}
          exit={{ 
            [axis]: index >= 0 ? '-100%' : '100%',
            opacity: 0 
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
          drag={axis}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset[axis === 'x' ? 'x' : 'y'], velocity[axis === 'x' ? 'x' : 'y']);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          style={{ width: '100%' }}
        >
          {React.Children.toArray(children)[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

SwipeableView.propTypes = {
  index: PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  axis: PropTypes.oneOf(['x', 'y'])
};

export default SwipeableView; 