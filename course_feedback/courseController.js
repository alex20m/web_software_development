import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import * as courseService from "./courseService.js";
import * as validation from "./validation.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const showForm = async (c) => {
  const course_list = await courseService.listCourses();
  return c.html(eta.render("courses.eta", { courses: course_list }),
  );
};

const createCourse = async (c) => {
  const body = await c.req.parseBody();
  const validationResult = validation.Validator.safeParse(body);
  if (!validationResult.success) {
    return c.html(
      eta.render("courses.eta", {
        ...body,
        errors: validationResult.error.format(),
        courses: await courseService.listCourses(),
      }),
    );
  };
  await courseService.createCourse(body);
  return c.redirect("/courses");
};

const showCourse = async (c) => {
    const id = c.req.param("id");
    const course_data = await courseService.getCourse(id);
    return c.html(eta.render("course.eta", { courses: course_data }),
    );
  };

  const updateTodo = async (c) => {
    const id = c.req.param("id");
    const body = await c.req.parseBody();
    await todoService.updateTodo(id, body);
    return c.redirect(`/todos/${id}`);
  };

  const storeFeedback = async (c) => {
    const id = c.req.param("id");
    const rating = c.req.param("rating");
    await courseService.storeFeedback(id, rating);
    return c.redirect(`/courses/${id}`);
  }

  const deleteCourse = async (c) => {
    const id = c.req.param("id");
    await courseService.deleteCourse(id);
    return c.redirect("/courses");
  };

  const showFeedback = async (c) => {
    const id = c.req.param("id");
    const rating = c.req.param("rating");
    const count = await courseService.showFeedback(id, rating);
    return c.text(`Feedback ${rating}: ${count}`);
  };

export { showForm, createCourse , showCourse, deleteCourse, storeFeedback, showFeedback };