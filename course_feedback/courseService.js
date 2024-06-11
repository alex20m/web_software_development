const createCourse = async (course) => {
    course.id = crypto.randomUUID();
    const kv = await Deno.openKv();
    await kv.set(["courses", course.id], course);
  };
  
  const listCourses = async () => {
    const kv = await Deno.openKv();
    const courseEntries = await kv.list({ prefix: ["courses"] });
    const courses = [];
    for await (const entry of courseEntries) {
      courses.push(entry.value);
    }
    return courses;
  };
  
  const getCourse = async (id) => {
    const kv = await Deno.openKv();
    const course = await kv.get(["courses", id]);
    return course?.value ?? {};
  };

  const updateTodo = async (id, todo) => {
    todo.id = id;
    const kv = await Deno.openKv();
    await kv.set(["todos", id], todo);
  };

  const storeFeedback = async (id, rating) => {
    const kv = await Deno.openKv();
    const countEntry = await kv.get(["feedback", id, rating]);
    let count = countEntry?.value ?? 0;
    count += 1;
    await kv.set(["feedback", id, rating], count);
  };

  const deleteCourse = async (id) => {
    const kv = await Deno.openKv();
    await kv.delete(["courses", id]);
  };

  const showFeedback = async (id, rating) => {
    const kv = await Deno.openKv();
    const countEntry = await kv.get(["feedback", id, rating]);
    let count = countEntry?.value ?? 0;
    return count;
  };
  
  export { createCourse, listCourses, getCourse, deleteCourse, storeFeedback, showFeedback };