/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import CursoPage from 'containers/CursoPage/Loadable';
import DiscentePage from 'containers/DiscentePage/Loadable';
import DocentePage from 'containers/DocentePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Admin
import AdminPage from 'containers/Admin/AdminPage/Loadable';
import AdminFormPage from 'containers/Admin/FormPage/Loadable';

// components
import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - Censo"
      defaultTitle="React.js Boilerplate"
    >
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/admin" component={AdminPage} />
      <Route exact path="/admin/form" component={AdminFormPage} />
      <Route path="/curso" component={CursoPage} />
      <Route path="/discente" component={DiscentePage} />
      <Route path="/docente" component={DocentePage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
    <Footer />
  </div>
);

export default App;
