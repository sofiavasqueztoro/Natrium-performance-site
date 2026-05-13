export const scenarios = [
  {
    id: 1,
    name: 'Startup',
    frameTime: 150,
    pss: 85807,
    rss: 175736,
    nativeHeap: 31425,
    dalvikHeap: 2909,
    threads: 38,
    views: 9,
    gpuMemory: 32,
    jankyFrames: 1
  },
  {
    id: 2,
    name: 'Navigation',
    frameTime: 150,
    pss: 92715,
    rss: 188656,
    nativeHeap: 37574,
    dalvikHeap: 3190,
    threads: 43,
    views: 9,
    gpuMemory: 32,
    jankyFrames: 1
  },
  {
    id: 3,
    name: 'QR / Transaction',
    frameTime: 200,
    pss: 82467,
    rss: 180016,
    nativeHeap: 34230,
    dalvikHeap: 3079,
    threads: 47,
    views: 9,
    gpuMemory: 32,
    jankyFrames: 1
  }
]

export const env = {
  device: 'Pixel emulator',
  resolution: '1080 x 2400',
  platform: 'Android',
  flutterVersion: 'x.x.x (placeholder)',
  dartVersion: 'x.x.x (placeholder)',
  buildMode: 'Profile (placeholder)'
}
