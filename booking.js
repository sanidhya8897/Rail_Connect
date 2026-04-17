const trainsData = [
    {
        id: 1,
        name: "Rajdhani Express",
        number: "12301",
        from: "Delhi",
        to: "Mumbai",
        departure: "16:00",
        arrival: "08:30",
        duration: "16h 30m",
        class: "ac",
        classType: "3A",
        price: 2500,
        available: 45
    },
    {
        id: 2,
        name: "Shatabdi Express",
        number: "12002",
        from: "Delhi",
        to: "Mumbai",
        departure: "06:00",
        arrival: "20:15",
        duration: "14h 15m",
        class: "ac",
        classType: "CC",
        price: 1800,
        available: 32
    },
    {
        id: 3,
        name: "Duronto Express",
        number: "12259",
        from: "Delhi",
        to: "Mumbai",
        departure: "22:30",
        arrival: "12:15",
        duration: "13h 45m",
        class: "ac",
        classType: "2A",
        price: 3200,
        available: 28
    },
    {
        id: 4,
        name: "Jan Shatabdi",
        number: "12009",
        from: "Delhi",
        to: "Mumbai",
        departure: "14:20",
        arrival: "06:45",
        duration: "16h 25m",
        class: "non-ac",
        classType: "CC",
        price: 950,
        available: 67
    },
    {
        id: 5,
        name: "Garib Rath",
        number: "12909",
        from: "Delhi",
        to: "Mumbai",
        departure: "11:30",
        arrival: "04:15",
        duration: "16h 45m",
        class: "ac",
        classType: "3A",
        price: 1650,
        available: 52
    },
    {
        id: 6,
        name: "Express Train",
        number: "12138",
        from: "Delhi",
        to: "Mumbai",
        departure: "18:45",
        arrival: "14:30",
        duration: "19h 45m",
        class: "non-ac",
        classType: "SL",
        price: 650,
        available: 89
    },
    {
        id: 7,
        name: "Superfast Express",
        number: "12951",
        from: "Delhi",
        to: "Mumbai",
        departure: "08:15",
        arrival: "01:45",
        duration: "17h 30m",
        class: "non-ac",
        classType: "SL",
        price: 750,
        available: 73
    },
    {
        id: 8,
        name: "Premium Express",
        number: "12423",
        from: "Delhi",
        to: "Mumbai",
        departure: "20:00",
        arrival: "10:30",
        duration: "14h 30m",
        class: "ac",
        classType: "1A",
        price: 4500,
        available: 18
    }
];

let currentTrains = [];
let selectedTrain = null;
let ticketCount = 1;
let searchParams = {};

function searchTrains(event) {
    event.preventDefault();
    
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const classFilter = document.getElementById('class').value;

    if (!from || !to || !date) {
        alert('Please fill in all search fields');
        return;
    }

    if (from === to) {
        alert('Source and destination cannot be the same');
        return;
    }

    searchParams = { from, to, date, classFilter };

    currentTrains = trainsData.filter(train => {
        const matchesRoute = train.from === from && train.to === to;
        const matchesClass = classFilter === 'all' || train.class === classFilter;
        return matchesRoute && matchesClass;
    });

    document.getElementById('filterSection').style.display = currentTrains.length > 0 ? 'flex' : 'none';
    displayTrains(currentTrains);
}

function displayTrains(trains) {
    const trainsList = document.getElementById('trainsList');
    
    if (trains.length === 0) {
        trainsList.innerHTML = `
            <div class="search-card">
                <div class="no-trains">
                    <h3>No trains found</h3>
                    <p>Try adjusting your search criteria or select a different route</p>
                </div>
            </div>
        `;
        return;
    }

    trainsList.innerHTML = trains.map(train => `
        <div class="train-card">
            <div class="train-info">
                <h3>${train.name}</h3>
                <p class="train-number">#${train.number}</p>
                <p class="duration">${train.duration}</p>
            </div>
            <div class="timing">
                <div class="time">${train.departure}</div>
                <div class="station">${train.from}</div>
            </div>
            <div class="timing">
                <div class="time">${train.arrival}</div>
                <div class="station">${train.to}</div>
            </div>
            <div class="price-section">
                <div class="class-type">${train.classType} (${train.class.toUpperCase()})</div>
                <div class="price">₹${train.price}</div>
                <div class="available">${train.available} seats available</div>
                <button class="book-btn" onclick="openBookingModal(${train.id})">Book Now</button>
            </div>
        </div>
    `).join('');
}

function sortTrains(sortType) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    let sorted = [...currentTrains];

    switch(sortType) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'duration':
            sorted.sort((a, b) => {
                const aDur = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1]);
                const bDur = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1]);
                return aDur - bDur;
            });
            break;
        case 'departure':
            sorted.sort((a, b) => a.departure.localeCompare(b.departure));
            break;
        default:
            sorted = [...currentTrains];
    }

    displayTrains(sorted);
}

function openBookingModal(trainId) {
    selectedTrain = trainsData.find(t => t.id === trainId);
    ticketCount = 1;
    
    const modal = document.getElementById('bookingModal');
    const detailsDiv = document.getElementById('bookingDetails');
    
    detailsDiv.innerHTML = `
        <p><strong>Train:</strong> ${selectedTrain.name} (${selectedTrain.number})</p>
        <p><strong>From:</strong> ${searchParams.from} - ${selectedTrain.departure}</p>
        <p><strong>To:</strong> ${searchParams.to} - ${selectedTrain.arrival}</p>
        <p><strong>Date:</strong> ${searchParams.date}</p>
        <p><strong>Duration:</strong> ${selectedTrain.duration}</p>
        <p><strong>Class:</strong> ${selectedTrain.classType} (${selectedTrain.class.toUpperCase()})</p>
        <p><strong>Price per ticket:</strong> ₹${selectedTrain.price}</p>
    `;
    
    document.getElementById('ticketCount').textContent = ticketCount;
    updateTotalPrice();
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

function incrementTickets() {
    if (ticketCount < selectedTrain.available) {
        ticketCount++;
        document.getElementById('ticketCount').textContent = ticketCount;
        updateTotalPrice();
    } else {
        alert(`Only ${selectedTrain.available} seats available`);
    }
}

function decrementTickets() {
    if (ticketCount > 1) {
        ticketCount--;
        document.getElementById('ticketCount').textContent = ticketCount;
        updateTotalPrice();
    }
}

function updateTotalPrice() {
    const total = selectedTrain.price * ticketCount;
    document.getElementById('totalPrice').textContent = total;
}

function confirmBooking() {
    const totalPrice = selectedTrain.price * ticketCount;
    
    alert(`Booking Confirmed!\n\nTrain: ${selectedTrain.name}\nFrom: ${searchParams.from} to ${searchParams.to}\nDate: ${searchParams.date}\nTickets: ${ticketCount}\nClass: ${selectedTrain.classType}\nTotal Amount: ₹${totalPrice}\n\nThank you for booking with Rail Connect!`);
    
    closeModal();
    
    selectedTrain.available -= ticketCount;
    displayTrains(currentTrains);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeModal();
    }
};