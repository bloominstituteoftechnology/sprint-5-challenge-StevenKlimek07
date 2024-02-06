
async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  // const currentYear = new Date().getFullYear()
  footer.textContent = "© BLOOM INSTITUTE OF TECHNOLOGY 2023"

  async function fetchData() {
    try {
      const [responseA, responseB] = await Promise.all([
        axios.get('http://localhost:3003/api/learners'),
        axios.get('http://localhost:3003/api/mentors')
      ]);
  
      const { data: dataA } = responseA;
      const { data: dataB } = responseB;

      // console.log('dataB:', dataB); // Add this line to log dataB
  
      const combinedData = dataA.map((learner) => {
        const mentors = learner.mentors.map((mentorId) => {
          // Check if dataB exists and has mentors property
          if (dataB && Array.isArray(dataB)) {
            const matchingMentor = dataB.find((mentor) => mentor.id == mentorId);
            return matchingMentor ? `${matchingMentor.firstName} ${matchingMentor.lastName}` : 'Unknown Mentor';
          } else {
            return 'Unknown Mentor';
          }
        });
      
        return {
          id: learner.id,
          email: learner.email,
          fullName: learner.fullName,
          mentors,
        };
      });
      
  
      return combinedData;
    } catch (error) {
      console.log('Error fetching data:', error.message);
      throw error;
    }
  }
  
  // Function to create a Learner Card
  function createLearnerCard(learner) {
    const card = document.createElement('div');
    card.classList.add('card');

    const fullNameElement = document.createElement('h3');
    fullNameElement.textContent = `${learner.fullName}`;
    
    // const idElement = document.createElement('p');
    // idElement.textContent = `${learner.id}`;
  
    const emailElement = document.createElement('div');
    emailElement.textContent = `${learner.email}`;

    const mentorsElement = document.createElement('h4');
    mentorsElement.textContent = "Mentors";
    mentorsElement.classList.add("closed") 


    card.appendChild(fullNameElement);
    // card.appendChild(idElement);
    card.appendChild(emailElement);
    card.appendChild(mentorsElement);

    const pElement = document.querySelector('p')

    // Add click event listener
  card.addEventListener('click', () => {
    // Change the text content of infoElement when card is clicked
    pElement.textContent = `The selected learner is ${learner.fullName}`;
  });


  
    return card;
  }

  // Main function to fetch data and create learner cards
  async function main() {
    try {
      const combinedData = await fetchData();
  
      // Assuming you have a container with the class "cards"
      const cardsContainer = document.querySelector('.cards');
  
      // Clear existing content in case you call main multiple times
      cardsContainer.innerHTML = '';
  
      combinedData.forEach((learner) => {
        const learnerCard = createLearnerCard(learner);
        cardsContainer.appendChild(learnerCard);
      });
    } catch (error) {
      console.error('Error in main:', error.message);
    }
  }
  
  // Call the main function
  main();


  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
