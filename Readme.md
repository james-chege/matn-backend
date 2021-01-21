#### Key components

The key files and directories to look at are:
1. `middleware/`
2. `routes/`
2. `controllers/`
3. `utils/`

#### Middleware

When a request is received the aim is to invoke a controller function to process it. Before the controller function is
hit we have middleware to perform checks.

#### Routes

The routes directory is made up of routers named after the system entity they represent. All the routers are registered
to the application in `index.js`


#### Utils

The `utils/` directory defines functions that are used throughout the app to simplify code and separate concerns. 

### Installing packages

Ensure that you're on the root directory of this repository and run the following command.

```bash
$ yarn install
```

# Setup

1. Create a postgres database with name of your choice.

    Development DB
    ```bash c
    createdb db_name -U postgres 
    ```
    
    Test DB
    ```bash c
    createdb test_db_name -U postgres 
    ```

2. Copy .env.example to .env and edit the environment variables to match your computer's postgres credentials and the databases that you created.

3. Migrate the development database schema:
   ```bash
   $ yarn migrate
   ```
   To undo this step run:
   ```bash
   $ yarn migrate:undo
   ```
   
4. Seed data
      ```bash
      $ yarn seed
      ```
5. Start express server.
   
   ```bash
   $ yarn start
   ```
   > Note: use Node.js version range that matches "10.x"
   
 ### Running tests
 
 ```bash
    $ yarn test
```
- Coverage
<img width="718" alt="Screenshot 2021-01-22 at 00 04 56" src="https://user-images.githubusercontent.com/29597869/105412404-bdb22680-5c45-11eb-9cf3-8d705b8bec29.png">
