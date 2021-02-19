import * as express from 'express';
import { PhotoState } from './app/photo/photo.model';

let state: PhotoState = {
  ['2d335401-d65e-4059-b8f0-a4816c82086f']: {
    id: '2d335401-d65e-4059-b8f0-a4816c82086f',
    title: 'Introduction to NgRx',
    url: 'https://ngrx.io/assets/images/ngrx-badge.png',
    likes: 0,
    dislikes: 0,
  },
  ['65a7eb36-f887-4a93-8fe7-38d20c77906f']: {
    id: '65a7eb36-f887-4a93-8fe7-38d20c77906f',
    title: 'Angular',
    url: 'https://angular.io/assets/images/logos/angular/angular.png',
    likes: 0,
    dislikes: 0,
  },
};

const app = express();

app.param('photoId', function (req, res, next, val) {
  const id = req.params.photoId;
  if (state[id]) {
    next();
  } else {
    res.sendStatus(404);
  }
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to myapp!' });
});

app.get('/api/photos', (req, res) => {
  res.send(state);
});

app.get('/api/photos/:photoId/like', (req, res) => {
  const id = req.params.photoId;
  const photo = state[id]
  state = {
    ...state,
    [id]: {
      ...photo,
      likes: photo.likes + 1
    }
  };
  res.send(state[id])
});

app.get('/api/photos/:photoId/dislike', (req, res) => {
  const id = req.params.photoId;
  const photo = state[id]
  state = {
    ...state,
    [id]: {
      ...photo,
      dislikes: photo.dislikes + 1
    }
  };
  res.send(state[id])
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
