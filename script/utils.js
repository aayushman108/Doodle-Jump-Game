function collisionDetection(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

