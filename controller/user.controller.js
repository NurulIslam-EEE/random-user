const fs = require("fs");
let users = require("../users.json");
// var data = fs.readFileSync("../file.json" );
// var myObject= JSON.parse(data);

module.exports.getRandomUser = (req, res, next) => {
  const max = users.length;
  const randomNumber = Math.floor(Math.random() * max);
  // const firstName = ["Mr", "Sr", "Jr"];
  //     const lastName = ["Bear", "john", "Musa", "kamal", "Emdad"];
  //     const randomFirstName = Math.floor(Math.random() * firstName.length);
  //     const randomLastName = Math.floor(Math.random() * lastName.length);
  //     const userName = firstName[randomFirstName] + lastName[randomLastName];
  // console.log(obj);
  // Defining new user
  // let user = {
  //   name: "New User",
  //   age: 30,
  //   language: ["PHP", "Go", "JavaScript"],
  // };
  // users.push(user);
  // fs.writeFile("users.json", JSON.stringify(users), (err) => {
  //   // Checking for errors
  //   if (err) throw err;

  //   console.log("Done writing"); // Success
  // });

  // console.log(randomNumber);
  if (randomNumber >= 0 && randomNumber < users.length) {
    res.send(users[randomNumber]);
  } else {
    res.send(users[25]);
  }
};

module.exports.getAllUser = (req, res, next) => {
  const queryValue = Object.values(req.query);
  // console.log(req.query, queryValue);
  if (queryValue.length > 0) {
    const filterUser = users.slice(0, parseInt(queryValue[0]));
    res.json(filterUser);
  } else {
    res.json(users);
  }
};

module.exports.saveUser = (req, res, next) => {
  let user = req.body;

  if (
    user.id &&
    user.gender &&
    user.name &&
    user.contact &&
    user.address &&
    user.photoUrl
  ) {
    // STEP 2: Adding new data to users object
    users.push(user);

    // STEP 3: Writing to a file
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      // Checking for errors
      if (err) throw err;

      // console.log("Done writing"); // Success
    });

    res.json({ success: true, message: "Your Data save successfully" });
  } else {
    res.json({ success: false, message: "Missing Field" });
  }
};

module.exports.updateUser = (req, res, next) => {
  const newData = req.body;
  // console.log(req.body);
  if (typeof newData === "object" && !Array.isArray(req.body)) {
    const index = users.findIndex((d) => d.id == newData.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...newData };

      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        // Checking for errors
        if (err) throw err;

        console.log("Done writing"); // Success
      });
      res.json({ success: true, message: "Update successfully" });
    } else {
      res.json({ success: false, message: "Data not found" });
    }
  } else {
    res.json({ success: false, message: "Provide body as object" });
  }
};

module.exports.bulkUpdate = (req, res, next) => {
  const newData = req.body;
  // console.log(req.body);
  if (Array.isArray(req.body)) {
    newData.forEach((element) => {
      const index = users.findIndex((d) => d.id == element.id);
      if (index !== -1){
        users[index] = { ...users[index], ...element };
        fs.writeFile("users.json", JSON.stringify(users), (err) => {
          // Checking for errors
          if (err) throw err;
  
          // console.log("Done writing"); // Success
        });
        res.json({ success: true, message: "Update successfully" });
      }
    });
  }else{
    res.json({ success: false, message: "Provide body as Array of object" });
  }

  
};
module.exports.deleteUser = (req, res, next) => {
  const user = req.body;
  if (user.id) {
    const filterUse = users.filter((d) => d.id == user.id);
    if (filterUse.length > 0) {
      const filterUsers = users.filter((d) => d.id != user.id);
      users = filterUsers;
      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        // Checking for errors
        if (err) throw err;

        // console.log("Done writing"); // Success
      });

      res.json({ message: "User delete successfully" });
    } else {
      res.json({ message: "User not found" });
    }
  } else {
    res.json({ message: "Please provide id like this{Id:1}" });
  }
  // console.log(req.body.id)
  // res.json({"message":"Server side error try again"})
};
