import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    method: 'GET',
    lastRequest: '',

    id: '',
    title: '',
    description: '',
    status: '',
    priority: '',
    project_id: '',
    reported_by: '',
    assigned_to: '',
    due_date: '',

    response: [],
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    let { method,
      id,
      title,
      description,
      status,
      priority,
      project_id,
      reported_by,
      assigned_to,
      due_date
     } = this.state;

    let request = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    // Undefined ensures not changing to empty string.
    title = title ? title : undefined;
    description = description ? description : undefined;
    status = status ? status : undefined;
    priority = priority ? priority : undefined;
    project_id = project_id ? project_id : undefined;
    reported_by = reported_by ? reported_by : undefined;
    assigned_to = assigned_to ? assigned_to : undefined;
    due_date = due_date ? due_date : undefined;
 
    if (method !== "GET")
      request.body = JSON.stringify({ title, description, status, priority, project_id, reported_by, assigned_to, due_date });

    this.setState({ lastRequest: `${method} at /issues/${id}` });

    let response;


    if (process.env.NODE_ENV === "development" && method === "GET" && id === '') {
      response = await fetch('http://localhost:5000/issues', request);
    } else {
      response = await fetch(`/issues/${id}`, request);
    }

    const contentType = response.headers.get('content-type');

    let body;
    if (contentType && contentType.includes('application/json')) {
      body = await response.json();
    } else if (contentType && contentType.includes('text/html')) {
      body = await response.text();
    }

    if (response.status !== 200) {
      console.log(body);
      this.setState({ response: [{ status: response.status, message: body }] });
      return;
    }

    if (!Array.isArray(body))
      body = Array(body);
    this.setState({ response: body });
  };

  changeMethod = event => {
    this.setState({ method: event.target.value });
  };
  
  render() {
    const { method, lastRequest, id, title, description, status, priority, assigned_to, response } = this.state;

    const shouldDisplayIdInput = method !== "POST";
    const shouldDisplayTitleInput = method === "POST" || method === "PATCH";
    const shouldDisplayDescriptionInput = method === "POST" || method === "PATCH";
    const shouldDisplayStatusInput = method === "POST" || method === "PATCH";
    const shouldDisplayPriorityInput = method === "POST" || method === "PATCH";
    const shouldDisplayAssignedToInput = method === "POST" || method === "PATCH";

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Powered by React
          </p>
        </header>

        <form onSubmit={this.handleSubmit}>
          <p>
            <h3>Send to Server:</h3>
          </p>
          <select value={method} onChange={this.changeMethod}>
            <option value="GET">Get</option>
            <option value="POST">Post</option>
            <option value="PATCH">Patch</option>
            <option value="DELETE">Delete</option>
          </select>
          <input
            disabled={!shouldDisplayIdInput}
            type="text"
            placeholder="id (int)"
            value={id}
            onChange={e => this.setState({ id: e.target.value })}
          />
          <input
            disabled={!shouldDisplayTitleInput}
            type="text"
            placeholder="Title (string)"
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <input
            disabled={!shouldDisplayDescriptionInput}
            type="text"
            placeholder="Description (string)"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
          />
          <input
            disabled={!shouldDisplayStatusInput}
            type="text"
            placeholder="Status (enum)"
            value={status}
            onChange={e => this.setState({ status: e.target.value })}
          />
          <input
            disabled={!shouldDisplayPriorityInput}
            type="text"
            placeholder="Priority (enum)"
            value={priority}
            onChange={e => this.setState({ priority: e.target.value })}
          />
          <input
            disabled={!shouldDisplayAssignedToInput}
            type="text"
            placeholder="Assigned To (int)"
            value={assigned_to}
            onChange={e => this.setState({ assigned_to: e.target.value })}
          />

          <button type="submit">Submit</button>
        </form>
        <h3>{`Last sent: ${lastRequest}`}</h3>
        <p>
          {
            response.map((issue, i) => {
              return (
                <li key={i}>
                  { 
                    issue ? Object.entries(issue).map(([key, value]) => {
                      return `${key}: ${value}   `
                    }) : undefined
                  }
                </li>
              )
            })
          }
        </p>
      </div>
    );
  }
}

export default App;