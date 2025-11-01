import Home from '../views/Home.vue'
import InsSquare from '../views/workLeft/InsSquare.vue'


export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'insSquare',
        component: InsSquare,
      },
      {
        path: '/copyGen',
        name: 'copyGen',
        component: () => import('../views/workLeft/CopyGen.vue'),
      },
      {
        path: '/imageGen',
        name: 'imageGen',
        component: () => import('../views/workLeft/ImageGen.vue'),
      },
      {
        path: '/videoGen',
        name: 'videoGen',
        component: () => import('../views/workLeft/VideoGen.vue'),
      },
    ]
  },
]
