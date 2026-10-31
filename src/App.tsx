/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useProductivityStore } from './hooks/useProductivityStore';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const store = useProductivityStore();
  const { hasStarted, enterDashboard, returnToLanding, totalActivities, completedActivities } = store;

  return (
    <div className="w-full min-h-screen bg-[#707B3B]">
      {!hasStarted ? (
        <LandingPage
          onStart={enterDashboard}
          tasksCount={totalActivities}
          completedCount={completedActivities}
        />
      ) : (
        <Dashboard
          onBackToLanding={returnToLanding}
          store={store}
        />
      )}
    </div>
  );
}
