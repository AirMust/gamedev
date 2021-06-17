import './App.css';
import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Forum } from 'pages/Forum/Forum';
import { Game } from 'pages/Game/Game';
import { LeaderBoard } from 'pages/LeaderBoard/LeaderBoard';
import { Login } from 'pages/Login/Login';
import { Profile } from 'pages/Profile/Profile';
import { Registration } from 'pages/Registration/Registration';
import { Error } from 'pages/Error/Error';
import { Start } from 'pages/Start/Start';
import { LanguageSelector } from 'components/molecules/LanguageSelector/LanguageSelector';
import { Main } from 'pages/Main/Main';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export const App: FC = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <LanguageSelector />
    </ErrorBoundary>

    <Switch>
      <Route exact path="/">
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
      </Route>

      <Route path="/login">
        <ErrorBoundary>
          <Login />
        </ErrorBoundary>
      </Route>

      <Route path="/registration">
        <ErrorBoundary>
          <Registration />
        </ErrorBoundary>
      </Route>

      <Route path="/start">
        <ErrorBoundary>
          <Start />
        </ErrorBoundary>
      </Route>

      <Route path="/forum">
        <ErrorBoundary>
          <Forum />
        </ErrorBoundary>
      </Route>

      <Route path="/game">
        <ErrorBoundary>
          <Game />
        </ErrorBoundary>
      </Route>

      <Route path="/leaderboard">
        <ErrorBoundary>
          <LeaderBoard />
        </ErrorBoundary>
      </Route>

      <Route path="/profile">
        <ErrorBoundary>
          <Profile />
        </ErrorBoundary>
      </Route>

      <Route path="*">
        <ErrorBoundary>
          <Error />
        </ErrorBoundary>
      </Route>

    </Switch>

  </BrowserRouter>
);
