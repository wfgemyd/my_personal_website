const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const gears = document.querySelector('.gears');
const githubProjects = document.querySelector('.github-projects-container');
const footer = document.querySelector('footer');
const nav1 = document.getElementById('nav');


hamburger.onclick = function () {
    this.classList.toggle('open');
    nav.classList.toggle('show');

    // Toggle visibility of gears and GitHub projects
    if (gears.style.visibility === 'hidden') {
        gears.style.visibility = 'visible';
        githubProjects.style.visibility = 'visible';
    } else {
        gears.style.visibility = 'hidden';
        githubProjects.style.visibility = 'hidden';
    }
};



function toggleGears() {
    // Get the elements that have the gear classes
    var gears = document.querySelectorAll('.gear-rotate, .gear-rotate-left');
    
    // Toggle the spinning animation on each gear
    gears.forEach(function(gear) {
        if (gear.style.animationPlayState === 'running') {
            gear.style.animationPlayState = 'paused';
        } else {
            gear.style.animationPlayState = 'running';
        }
    });
    
    // Optionally, toggle the background color
    document.body.classList.toggle('darken-background');
}

document.addEventListener("DOMContentLoaded", function() {
    fetchGithubProjects();
});



function fetchGithubProjects() {
    fetch("https://api.github.com/users/wfgemyd/repos")
        .then(response => response.json())
        .then(repos => {
            // Sort the repositories by the last update date in descending order
            const sortedRepos = repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
            
            const projectsContainer = document.getElementById("github-projects");
            if (projectsContainer) {
                projectsContainer.innerHTML = ''; // Clear existing content

                sortedRepos.forEach(repo => {
                    fetchLastCommit(repo.commits_url.replace('{/sha}', ''))
                        .then(lastCommitDate => {
                            const projectDiv = document.createElement("div");
                            projectDiv.className = 'project';
                            projectDiv.innerHTML = `
                                <div class="project-title"><h3>${repo.name}</h3><span>Last commit: ${lastCommitDate}</span></div>
                                <div class="project-description"><p>${repo.description || ''}</p></div>
                                <div class="project-link"><a href="${repo.html_url}" target="_blank">View on GitHub</a></div>
                            `;
                            projectsContainer.appendChild(projectDiv);
                        });
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

function fetchLastCommit(commitsUrl) {
    return fetch(commitsUrl)
        .then(response => response.json())
        .then(commits => {
            if (commits.length > 0) {
                const lastCommit = commits[0];
                return new Date(lastCommit.commit.committer.date).toLocaleDateString();
            } else {
                return 'No commits';
            }
        })
        .catch(() => 'Unavailable');
}





//function handleScroll() {
//  const footerRect = footer.getBoundingClientRect();
//  const navHeight = nav.offsetHeight;
  
  // Check if the footer is coming into the viewport
//  if (window.innerHeight - footerRect.top > 0) {
    // Adjust the bottom position of the nav based on the footer's position
//    nav1.style.bottom = `${window.innerHeight - footerRect.top}px`;
//  } else {
    // Reset the bottom position when the footer is not in view
//    nav1.style.bottom = '0';
//  }
//}
//window.addEventListener('scroll', handleScroll);

let isThrottled = false;
const throttleDuration = 100; // milliseconds

function handleScroll() {
  if (isThrottled) return;

  isThrottled = true;
  setTimeout(() => {
    isThrottled = false;
  }, throttleDuration);

  const footerRect = footer.getBoundingClientRect();
  
  // Use window.visualViewport.height if supported for better mobile support
  const viewportHeight = window.visualViewport?.height || window.innerHeight;
  const navHeight = nav.offsetHeight;
  
  // Check if the footer is coming into the viewport
  if (viewportHeight - footerRect.top > 0) {
    // Adjust the bottom position of the nav based on the footer's position
    nav1.style.bottom = `${viewportHeight - footerRect.top}px`;
  } else {
    // Reset the bottom position when the footer is not in view
    nav1.style.bottom = '0';
  }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll); // Adjust for viewport changes like virtual keyboard




