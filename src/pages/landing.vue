<template>
  <section
    aria-labelledby="hero-title"
    class="flex flex-col md:flex-row h-fit max-h-[90vh] w-fit !mb-10 md:!mb-0"
  >
    <div>
      <p
        class="flex w-fit px-2 py-1 items-center text-green-primary font-bold rounded-xl bg-gray-100"
      >
        <MaterialSymbolsFavorite class="mr-1" />Building a community of learners
      </p>
      <h1 id="hero-title" class="!text-5xl md:!text-6xl font-extrabold">
        Every Textbook Deserves
        <span class="text-green-700">Another Student</span>
      </h1>
      <p class="text-lg mt-4 mb-4">
        Donate books, and help schools build community-powered learning
        resources
      </p>
      <el-button type="primary" class="p-4 !hidden md:!flex"
        ><router-link class="flex gap-2 !text-lg" :to="{ name: 'donate' }"
          ><MaterialSymbolsFeaturedSeasonalAndGifts />Donate Books</router-link
        >
      </el-button>
      <ul class="flex p-0 gap-3 md:gap-8 mt-4">
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
            <div class="text-2xl font-bold">2000+</div>
            Students Impacted
          </div>
        </li>
      </ul>
    </div>
    <img
      class="md:w-[65%] h-fit"
      src="@/assets/images/landing-hero.png"
      alt="Hero Image"
    />
    <div class="text-right">
      <el-button type="primary" class="p-4 w-fit md:!hidden fixed right-3 bottom-10 z-50"
        ><router-link class="flex gap-2 !text-lg" :to="{ name: 'donate' }"
          ><MaterialSymbolsFeaturedSeasonalAndGifts />
          <!-- Donate Books -->
        </router-link>
      </el-button>
    </div>
  </section>
  <section class="flex flex-wrap md:!flex-nowrap gap-10">
    <article
      class="flex w-full bg-[#F7F8EE] md:w-1/2 rounded-lg px-5 py-4 items-center"
    >
      <div>
        <h6 class="!text-green-800">FOR DONORS</h6>
        <p class="font-bold text-2xl">Give Your Books A Second Life</p>
        <p>
          Donate your used textbooks and help students who can't afford to buy
          new ones
        </p>
        <el-button type="primary" class="p-4"
          ><router-link class="flex items-center gap-2" :to="{ name: 'donate' }"
            >Donate Now <MaterialSymbolsArrowRightAltRounded
          /></router-link>
        </el-button>
      </div>
      <img
        src="@/assets/images/donate-books.png"
        class="w-3/5 h-fit hidden md:block"
        alt="Donate Books Image"
      />
    </article>
    <article
      class="bg-blue-50 flex w-full md:w-1/2 rounded-lg px-5 py-4 items-center"
    >
      <div class="h-fit">
        <h6 class="!text-blue-900">FOR SCHOOLS</h6>
        <p class="font-bold text-2xl">Become A Community Book Hub</p>
        <p>
          Register your school to receive donations and make books available to
          your students
        </p>
        <el-button type="plain" class="p-4 bg-transparent !border-green-700"
          ><router-link
            class="flex items-center gap-2 text-black"
            :to="{ name: 'donate' }"
            >Register Your School <MaterialSymbolsArrowRightAltRounded
          /></router-link>
        </el-button>
      </div>
      <a href="https://www.vecteezy.com/free-vector/learning" class="hidden"
        >Learning Vectors by Vecteezy</a
      >
      <img
        src="@/assets/images/school-building.png"
        class="w-1/2 hidden md:block"
        alt="School Image"
      />
      <!-- <img src="@/assets/images/school.png" alt="School Image" /> -->
    </article>
  </section>
  <section>
    <h4 class="text-center mt-5 mb-4">How It Works</h4>
    <ol class="flex flex-wrap justify-content-between gap-4">
      <li class="md:flex-1">
        <article class="flex gap-2">
          <div class="number">1</div>
          <img
            src="@/assets/images/school-building.png"
            class="w-24 h-24"
            alt="School building representing school verification"
          />
          <div>
            <h6>School Verification</h6>
            <p>
              Schools register and upon verification are listed on the platform
            </p>
          </div>
        </article>
      </li>
      <li class="md:flex-1">
        <article class="flex gap-2">
          <div class="number">2</div>
          <img
            src="@/assets/images/book-stack.jpg"
            class="w-24 h-24 rounded-full"
            alt="Books representing donation process"
          />
          <div>
            <h6>Donate Books</h6>
            <p>
              Individuals or organizations donate used textbooks and drop off at
              verified schools
            </p>
          </div>
        </article>
      </li>
      <li class="md:flex-1">
        <article class="flex gap-2">
          <div class="number">3</div>
          <img
            src="@/assets/images/computer.jpg"
            class="w-24 h-24"
            alt="Computer system representing inventory update process"
          />
          <div>
            <h6>Inventory Update</h6>
            <p>Schools catalog and list books on the platform</p>
          </div>
        </article>
      </li>
      <li class="md:flex-1">
        <article class="flex gap-2">
          <div class="number">4</div>
          <img
            src="@/assets/images/reading-book.jpg"
            class="w-24 h-24 rounded-full"
            alt="Student accessing books through borrowing system"
          />
          <div>
            <h6>Students Borrow</h6>
            <p>
              Students can access the books they need from their school's book
              hub.
            </p>
          </div>
        </article>
      </li>
    </ol>
  </section>
  <div class="flex flex-col md:flex-row gap-4 justify-between">
    <section>
      <h4>Registered Schools</h4>
      <div class="flex flex-wrap gap-4 justify-content-between">
        <article class="p-3 shadow-md rounded-xl border flex-1 relative">
          <span class="rounded absolute top-2 right-2 bg-green-300 p-1 text-sm"
            >Active</span
          >
          <h4>
            <span
              class="rounded-full bg-yellow-100 mb-2 flex items-center justify-center h-10 w-10"
              >G</span
            >
            Greenwood High School
          </h4>
          <p><i class="fa-icon-date"></i>Joined since</p>
          <p><i class="fa-icon-book"></i>500+ Books Received</p>
          <!-- <button
            class="btn-basic !text-neutral-950 absolute right-3 left-3 bottom-3 justify-center"
          >
            Donate to school <MaterialSymbolsArrowRightAltRounded />
          </button> -->
          <el-button type="plain" class="p-4"
            ><router-link
              class="flex items-center gap-2 text-black"
              :to="{ name: 'donate' }"
              >Donate to School <MaterialSymbolsArrowRightAltRounded
            /></router-link>
          </el-button>
        </article>
        <article class="p-3 shadow-md rounded-xl border flex-1 relative">
          <span class="rounded absolute top-2 right-2 bg-green-300 p-1 text-sm"
            >Active</span
          >
          <h4>
            <span
              class="rounded-full bg-pink-100 mb-2 flex items-center justify-center h-10 w-10"
              >R</span
            >
            Riverside Academy
          </h4>
          <p><i class="fa-icon-date"></i>Joined since</p>
          <p><i class="fa-icon-book"></i>300+ Books Received</p>
          <el-button type="plain" class="p-4"
            ><router-link
              class="flex items-center gap-2 text-black"
              :to="{ name: 'donate' }"
              >Donate to School <MaterialSymbolsArrowRightAltRounded
            /></router-link>
          </el-button>
        </article>
        <article class="p-3 shadow-md rounded-xl border flex-1 relative">
          <span class="rounded absolute top-2 right-2 bg-green-300 p-1 text-sm"
            >Active</span
          >
          <h4>
            <span
              class="rounded-full bg-purple-100 mb-2 flex items-center justify-center h-10 w-10"
              >H</span
            >
            Hilltop Secondary School
          </h4>
          <p><i class="fa-icon-date"></i>Joined since</p>
          <p><i class="fa-icon-book"></i>300+ Books Received</p>
          <el-button type="plain" class="p-4"
            ><router-link
              class="flex items-center gap-2 text-black"
              :to="{ name: 'donate' }"
              >Donate to School <MaterialSymbolsArrowRightAltRounded
            /></router-link>
          </el-button>
        </article>
        <article class="p-3 shadow-md rounded-xl border flex-1 relative">
          <span class="rounded absolute top-2 right-2 bg-green-300 p-1 text-sm"
            >Active</span
          >
          <h4>
            <span
              class="rounded-full bg-teal-100 mb-2 flex items-center justify-center h-10 w-10"
              >H</span
            >
            Hilltop Secondary School
          </h4>
          <p><i class="fa-icon-date"></i>Joined since</p>
          <p><i class="fa-icon-book"></i>300+ Books Received</p>
          <el-button type="plain" class="p-4"
            ><router-link
              class="flex items-center gap-2 text-black"
              :to="{ name: 'donate' }"
              >Donate to School <MaterialSymbolsArrowRightAltRounded
            /></router-link>
          </el-button>
        </article>
      </div>
      <div class="text-center">
        <el-button type="plain" class="p-4 !text-green-600 mt-4"
          ><router-link class="flex items-center gap-2" :to="{ name: 'donate' }"
            >See All Schools <MaterialSymbolsArrowRightAltRounded
          /></router-link>
        </el-button>
      </div>
    </section>
    <section
      class="bg-green-900 text-white [&_p]:!text-white [&_strong]:text-lg [&_article]:flex [&_article]:items-cente p-4 rounded-2xl"
    >
      <h4>Our Impact</h4>
      <p class="text-wrap">
        Together, we are creating opportunities through books.
      </p>
      <ul>
        <li>
          <article>
            <GameIconsOpenBook class="text-4xl mr-1 text-green-300" />
            <p><strong>5,000+ </strong><br />Books Shared</p>
          </article>
        </li>
        <li>
          <article>
            <IconParkSolidSchool class="text-4xl mr-1 text-blue-300" />
            <p><strong>50+ </strong><br />Schools</p>
          </article>
        </li>
        <li>
          <article>
            <MaterialSymbolsFavorite class="text-4xl mr-1 text-red-400" />
            <p><strong>100+ </strong><br />Generous Donors</p>
          </article>
        </li>
      </ul>
    </section>
  </div>
  <section
    class="md:flex justify-around align-items-center mt-5 rounded-xl p-3 md:px-0 bg-emerald-950 [&_p]:!text-white text-white"
  >
    <PhBooksFill class="text-5xl hidden md:block" />
    <!-- <img src="../assets/join-us.png" alt="Join Us Image" /> -->
    <div>
      <h2>Ready to make textbooks accessible for every student?</h2>
      <p>Your books can open doors to a brighter future</p>
    </div>
    <div class="md:gap-3 flex">
      <el-button type="primary" class="md:p-4"
        ><router-link :to="{ name: 'donate' }">Donate Books</router-link>
      </el-button>
      <el-button
        type="plain"
        class="md:p-4 bg-transparent !text-white hover:!text-green-100"
        ><router-link :to="{ name: 'donate' }"
          >Register Your School</router-link
        >
      </el-button>
    </div>
    <EmojioneBackpack class="text-5xl hidden md:block" />
  </section>
</template>

<script setup lang="ts">
import MaterialSymbolsFavorite from '~icons/material-symbols/favorite'
import MaterialSymbolsFeaturedSeasonalAndGifts from '~icons/material-symbols/featured-seasonal-and-gifts'
import BasilBookOpenSolid from '~icons/basil/book-open-solid'
import RiSchoolFill from '~icons/ri/school-fill'
import PhUsersThreeFill from '~icons/ph/users-three-fill'
import PhBooksFill from '~icons/ph/books-fill'
import GameIconsOpenBook from '~icons/game-icons/open-book'
import IconParkSolidSchool from '~icons/icon-park-solid/school'
import EmojioneBackpack from '~icons/emojione/backpack'
import MaterialSymbolsArrowRightAltRounded from '~icons/material-symbols/arrow-right-alt-rounded'
</script>
<style lang="scss" scoped>
.btn-basic {
  border: 1px solid #d1d1d6;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}
.number {
  border-radius: 50%;
  color: white;
  background-color: rgb(9, 95, 9);
  min-width: 30px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}
</style>
