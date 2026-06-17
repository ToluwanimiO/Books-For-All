<template>
  <section aria-labelledby="hero-title" class="flex h-[90vh]">
    <div>
      <p
        class="flex w-fit px-2 py-1 items-center text-green-primary font-bold rounded-xl bg-gray-100"
      >
        <MaterialSymbolsFavorite class="mr-1" />Building a community of learners
      </p>
      <h1 id="hero-title" class="!text-6xl font-extrabold">
        Every Textbook Deserves
        <span class="text-green-700">Another Student</span>
      </h1>
      <p>
        Donate books, and help schools build community-powered learning
        resources
      </p>
      <button
        class="flex items-center bg-green-600 text-white p-3 rounded font-bold"
      >
        <MaterialSymbolsFeaturedSeasonalAndGifts class="mr-1" />Donate Books
      </button>
      <ul class="flex p-0 gap-8 mt-4">
        <li class="flex items-center">
          <BasilBookOpenSolid class="mr-2 text-green-600 text-4xl" />
          <div>
            <div class="text-2xl font-bold">5000+</div>
            Books Donated
          </div>
        </li>
        <li class="flex items-center">
          <RiSchoolFill class="mr-2 text-blue-600 text-4xl" />
          <div>
            <div class="text-2xl font-bold">50+</div>
            Schools
          </div>
        </li>
        <li class="flex items-center">
          <PhUsersThreeFill class="mr-2 text-yellow-600 text-4xl" />
          <div>
            <div class="text-2xl font-bold">2000+ </div>
            Students Impacted
          </div>
        </li>
      </ul>
    </div>
    <img src="@/assets/images/landing-hero.png" alt="Hero Image" />
  </section>
  <section class="flex gap-7">
    <article class="flex bg-[#F7F8EE] rounded-lg px-5 py-4">
      <div>
        <h3>FOR DONORS</h3>
        <p>Give Your Books A Second Life</p>
        <p>
          Donate your used textbooks and help students who can't afford to buy
          new ones
        </p>
        <button class="boxed">
          Donate Now <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <img src="../assets/donate-books.png" alt="Donate Books Image" />
    </article>
    <article class="d-flex">
      <div>
        <h3>FOR SCHOOLS</h3>
        <p>Become A Community Book Hub</p>
        <p>
          Register your school to receive donations and make books available to
          your students
        </p>
        <button class="boxed">
          Register Your School <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <img src="../assets/school.png" alt="School Image" />
    </article>
  </section>
  <section>
    <h2>How It Works</h2>
    <ol class="d-flex justify-content-between">
      <li>
        <article>
          <div class="number">1</div>
          <img
            src="../assets/donate-books.png"
            alt="School building representing school verification"
          />
          <h3>School Verification</h3>
          <p>
            Schools register and upon verification are listed on the platform
          </p>
        </article>
      </li>
      <li>
        <article>
          <div class="number">2</div>
          <img
            src="../assets/donate-books.png"
            alt="Books representing donation process"
          />
          <h3>Donate Books</h3>
          <p>
            Individuals or organizations donate used textbooks and drop off at
            verified schools
          </p>
        </article>
      </li>
      <li>
        <article>
          <div class="number">3</div>
          <img
            src="../assets/donate-books.png"
            alt="Computer system representing inventory update process"
          />
          <h3>Inventory Update</h3>
          <p>Schools catalog and list books on the platform</p>
        </article>
      </li>
      <li>
        <article>
          <div class="number">4</div>
          <img
            src="../assets/donate-books.png"
            alt="Student accessing books through borrowing system"
          />
          <h3>Students Borrow</h3>
          <p>
            Students can access the books they need from their school's book
            hub.
          </p>
        </article>
      </li>
    </ol>
  </section>
  <div class="d-flex">
    <section>
      <h2>Registered Schools</h2>
      <div class="d-flex justify-content-between">
        <article>
          <span class="badge active">Accepting Donations</span>
          <h3>
            <div>G</div>
            Greenwood High School
          </h3>
          <p><i class="fa-icon-date"></i>Joined since</p>
          <p><i class="fa-icon-book"></i>500+ Books Received</p>
        </article>
        <article>
          <span class="badge active">Accepting Donations</span>
          <h3>
            <div>R</div>
            Riverside Academy
          </h3>
          <p><i class="fa-icon-date"></i>Joined since</p>
          <p><i class="fa-icon-book"></i>300+ Books Received</p>
        </article>
        <article>
          <span class="badge inactive">Not Accepting Donations</span>
          <h3>
            <div>H</div>
            Hilltop Secondary School
          </h3>
          <p><i class="fa-icon-date"></i>Joined since</p>
          <p><i class="fa-icon-book"></i>200+ Books Received</p>
        </article>
      </div>
    </section>
    <section>
      <h2>Our Impact</h2>
      <p>Together, we are creating opportunities through books.</p>
      <ul>
        <li>
          <article>
            <img src="../assets/impact1.png" />
            <p><strong>5,000+ </strong>Books Shared</p>
          </article>
        </li>
        <li>
          <article>
            <img src="../assets/impact1.png" />
            <p><strong>50+ </strong>Schools</p>
          </article>
        </li>
        <li>
          <article>
            <img src="../assets/heart.png" />
            <p><strong>100+ </strong>Generous Donors</p>
          </article>
        </li>
      </ul>
    </section>
  </div>
  <section class="d-flex flex-column align-items-center">
    <img src="../assets/join-us.png" alt="Join Us Image" />
    <div>
      <h2>Ready to make textbooks accessible for every student?</h2>
      <p>Your books can open doors to a brighter future</p>
    </div>
    <div class="cta-buttons">
      <button class="boxed">Donate Books</button>
      <button class="boxed">Register Your School</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import MaterialSymbolsFavorite from '~icons/material-symbols/favorite'
import MaterialSymbolsFeaturedSeasonalAndGifts from '~icons/material-symbols/featured-seasonal-and-gifts'
import BasilBookOpenSolid from '~icons/basil/book-open-solid'
import RiSchoolFill from '~icons/ri/school-fill'
import PhUsersThreeFill from '~icons/ph/users-three-fill'
</script>
<style lang="scss" scoped>
.boxed {
  border: 1px solid #d1d1d6;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
}

.boxed:hover {
  background-color: #fafffc;
  border: 1px solid #6ece8a;
}
</style>
