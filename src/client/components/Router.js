import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Sessions = React.lazy(() => import('./Sessions'));
const Profile = React.lazy(() => import('./Profile'));
const Courses = React.lazy(() => import('./Courses'));
const CreateCourse = React.lazy(() => import('./CreateCourse'));
const UserSessions = React.lazy(() => import('./UserSessions'));
const Instructors = React.lazy(() => import('./Instructors'));
const InstructorInvitation = React.lazy(() => import('./InstructorInvitation'));

const Router = () => (
  <Switch>
    <Route path="/" exact>
      <Sessions />
    </Route>

    <Route path="/profile" exact>
      <Profile />
    </Route>

    <Route path="/courses" exact>
      <Courses />
    </Route>

    <Route path="/courses/new" exact>
      <CreateCourse />
    </Route>

    <Route path="/my-sessions" exact>
      <UserSessions />
    </Route>

    <Route path="/instructors" exact>
      <Instructors />
    </Route>

    <Route path="/instructor-invitation/:token" exact>
      <InstructorInvitation />
    </Route>
  </Switch>
);

export default Router;
