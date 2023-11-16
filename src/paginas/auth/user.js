
import React from 'react';
import { Link } from 'react-router-dom';

const User = () => {
  return (
<div className="dashboard">
  {/* Dashboard Sidebar (Block)*/}
  <div className="dashboard-sidebar">
    {/* Brand (Element)*/}
    <div className="dashboard-sidebar__brand"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/planner_dashboard_logo.svg" /></div>
    {/* Dashboard Nav (Block)*/}
    <div className="dashboard-nav">
      <ul>
        {/* Item (Element)*/}
        <li className="dashboard-nav__item"><a href="home"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/planner_dashboard_home.svg" />Home</a></li>
        {/* Item:Selected (Element:Modifier)        */}
        <li className="dashboard-nav__item dashboard-nav__item--selected"><a href="my_trip"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/planner_dashboard_my_trip.svg" />My Trip</a></li>
        {/* Item (Element)*/}
        <li className="dashboard-nav__item"><a href="discover_places"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/planner_dashboard_discover_places.svg" />Discover Places</a></li>
        {/* Item (Element)*/}
        <li className="dashboard-nav__item"><a href="notifications"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/planner_dashboard_notifications.svg" />Notifications</a></li>
        {/* Item (Element)*/}
        <li className="dashboard-nav__item"><a href="settings"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/planner_dashboard_settings.svg" />Settings</a></li>
      </ul>
    </div>
  </div>
  {/* Dashboard Content (Block)*/}
  <div className="dashboard-content">
    {/* Dashboard Header (Block)*/}
    {/* Dashboard Content Panel (Element)*/}
    <div className="dashboard-content__panel" data-panel-id="home">
      <p>Home</p>
    </div>
    {/* Dashboard Content Panel (Element)*/}
    <div className="dashboard-content__panel dashboard-content__panel--active" data-panel-id="my_trip">
      {/* Dashboard List (Block) */}
    </div>
    {/* Dashboard Content Panel (Element)*/}
    <div className="dashboard-content__panel" data-panel-id="discover_places">
      <p>Discover Places</p>
    </div>
    {/* Dashboard Content Panel (Element)*/}
    <div className="dashboard-content__panel" data-panel-id="notifications">
      <p>Notifications</p>
    </div>
    {/* Dashboard Content Panel (Element)*/}
    <div className="dashboard-content__panel" data-panel-id="settings">
      <p>Settings</p>
    </div>
  </div>
  {/* Dashboard Preview (Block)  */}
  <div className="dashboard-preview">
    {/* Panel (Element)*/}
    <div className="dashboard-preview__panel" data-panel-id="kulon_progo">
      {/* Header (Element)*/}
      <div className="dashboard-preview__header">
        <h2>Kulon Progo</h2>
        <h3>34<span>C</span>
        </h3>
      </div>
      {/* Content (Element)*/}
      <div className="dashboard-preview__content">
      </div>
    </div>
    {/* Panel (Element)*/}
    <div className="dashboard-preview__panel dashboard-preview__panel--active" data-panel-id="bromo">
      {/* Header (Element)*/}
      <div className="dashboard-preview__header">
        <h2>Bromo</h2>
        <h3>21<span>C</span>
        </h3>
      </div>
      {/* Content (Element)*/}
      <div className="dashboard-preview__content">
      </div>
    </div>
  </div>
</div>

  );
};

export default User;
