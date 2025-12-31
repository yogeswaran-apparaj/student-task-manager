// Custom Cursor (same as login)
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
// Reset any corrupted stats on page load
document.addEventListener('DOMContentLoaded', () => {
    // Force reset stats to 0
    totalTasksEl.textContent = '0';
    completedTasksEl.textContent = '0';
    pendingTasksEl.textContent = '0';
    
    // Then fetch tasks
    fetchTasks();
    setupEventListeners();
});
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Interactive elements
const interactiveElements = document.querySelectorAll('input, button, a, .task-card, .stat-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.borderColor = '#00cec9';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.borderColor = '#6c5ce7';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Backend API URL (update if needed)
const API_URL = 'http://localhost:5000/tasks'; 

// DOM Elements
const tasksContainer = document.getElementById('tasksContainer');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const closeModalBtns = document.querySelectorAll('.close-modal');
const logoutBtn = document.getElementById('logoutBtn');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');

// State
let tasks = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Modal
    addTaskBtn.addEventListener('click', () => {
        taskModal.style.display = 'flex';
        document.getElementById('taskTitle').focus();
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            taskModal.style.display = 'none';
            taskForm.reset();
        });
    });
    
    // Close modal on outside click
    taskModal.addEventListener('click', (e) => {
        if (e.target === taskModal) {
            taskModal.style.display = 'none';
            taskForm.reset();
        }
    });
    
    // Task form
    taskForm.addEventListener('submit', handleAddTask);
    
    // Logout
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'login.html';
        }
    });
}

// API Functions
async function fetchTasks() {
    try {
        console.log('Fetching tasks from:', API_URL);
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Verify it's JSON before parsing
        const text = await response.text();
        let tasks = [];
        
        try {
            tasks = JSON.parse(text);
        } catch (parseError) {
            console.error('Failed to parse JSON:', text);
            throw new Error('Invalid JSON response from server');
        }
        
        console.log('Tasks fetched:', tasks);
        
        renderTasks();
        updateStats();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        
        // Show user-friendly message
        tasksContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Backend Response Error</h3>
                <p>${error.message}</p>
                <p>Please check backend server logs.</p>
                <button onclick="location.reload()" class="retry-btn">
                    <i class="fas fa-sync-alt"></i> Retry
                </button>
            </div>
        `;
        
        // Reset stats to 0
        totalTasksEl.textContent = '0';
        completedTasksEl.textContent = '0';
        pendingTasksEl.textContent = '0';
    }
}
async function addTask(taskData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData)
        });
        
        if (!response.ok) throw new Error('Failed to add task');
        
        const newTask = await response.json();
        tasks.unshift(newTask); // Add to beginning
        renderTasks();
        updateStats();
        
        // Show success animation
        const addBtn = document.querySelector('.add-task-btn');
        addBtn.classList.add('complete-animation');
        setTimeout(() => addBtn.classList.remove('complete-animation'), 500);
        
        return newTask;
    } catch (error) {
        console.error('Error adding task:', error);
        showError('Failed to add task. Please try again.');
        throw error;
    }
}

async function updateTask(id, updates) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates)
        });
        
        if (!response.ok) throw new Error('Failed to update task');
        
        const updatedTask = await response.json();
        const index = tasks.findIndex(task => task._id === id);
        if (index !== -1) {
            tasks[index] = updatedTask;
            renderTasks();
            updateStats();
        }
        
        return updatedTask;
    } catch (error) {
        console.error('Error updating task:', error);
        showError('Failed to update task. Please try again.');
        throw error;
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete task');
        
        tasks = tasks.filter(task => task._id !== id);
        renderTasks();
        updateStats();
        
        return true;
    } catch (error) {
        console.error('Error deleting task:', error);
        showError('Failed to delete task. Please try again.');
        throw error;
    }
}

// UI Functions
function renderTasks() {
    if (tasks.length === 0) {
        tasksContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h3>No tasks yet</h3>
                <p>Add your first task to get started!</p>
            </div>
        `;
        return;
    }
    
    tasksContainer.innerHTML = tasks.map(task => `
        <div class="task-card" data-id="${task._id}">
            <div class="task-header">
                <h3 class="task-title">${escapeHtml(task.title)}</h3>
                <div class="task-actions">
                    <button class="action-btn complete-btn" onclick="toggleComplete('${task._id}')" title="${task.completed ? 'Mark as Pending' : 'Mark as Complete'}">
                        <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteTaskHandler('${task._id}')" title="Delete Task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <p class="task-description">${escapeHtml(task.description) || 'No description provided.'}</p>
            <div class="task-footer">
                <span class="task-date">Created: ${formatDate(task.createdAt)}</span>
                <span class="task-status ${task.completed ? 'status-completed' : 'status-pending'}">
                    ${task.completed ? 'Completed' : 'Pending'}
                </span>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const total = tasks.length || 0;
    const completed = tasks.filter(task => task.completed).length || 0;
    const pending = Math.max(0, total - completed); // Ensure never negative
    
    // Direct update - no animation for now
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
    
    // Remove any negative or NaN values
    [totalTasksEl, completedTasksEl, pendingTasksEl].forEach(el => {
        const value = parseInt(el.textContent);
        if (isNaN(value) || value < 0) {
            el.textContent = '0';
        }
    });
}

function animateCounter(element, target) {
    // Handle negative or NaN values
    const currentText = element.textContent.trim();
    let current = parseInt(currentText);
    
    // If current is NaN or negative, reset to 0
    if (isNaN(current) || current < 0) {
        current = 0;
        element.textContent = '0';
    }
    
    // If target is not a number, set to 0
    if (isNaN(target)) {
        target = 0;
    }
    
    const increment = target > current ? 1 : -1;
    let currentValue = current;
    
    const timer = setInterval(() => {
        currentValue += increment;
        element.textContent = Math.max(0, currentValue); // Ensure never negative
        
        if (currentValue === target) {
            clearInterval(timer);
        }
    }, 50);
}

// Event Handlers
async function handleAddTask(e) {
    e.preventDefault();
    
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    
    if (!title) {
        alert('Please enter a task title');
        return;
    }
    
    try {
        await addTask({ title, description });
        taskModal.style.display = 'none';
        taskForm.reset();
    } catch (error) {
        // Error already handled in addTask
    }
}

async function toggleComplete(id) {
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    
    // Animate the button
    const btn = document.querySelector(`[onclick="toggleComplete('${id}')"]`);
    btn.classList.add('complete-animation');
    setTimeout(() => btn.classList.remove('complete-animation'), 500);
    
    await updateTask(id, { completed: !task.completed });
}

async function deleteTaskHandler(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    const taskElement = document.querySelector(`[data-id="${id}"]`);
    if (taskElement) {
        // Add delete animation
        taskElement.classList.add('delete-animation');
        
        // Wait for animation to complete before removing
        setTimeout(async () => {
            await deleteTask(id);
        }, 500);
    }
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    // Style the error notification
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(214, 48, 49, 0.9);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}