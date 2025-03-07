# Build
# podman build -t react-devcontainer .

# Run
# podman run --rm -it --name react-tic-tac-toe-devcontainer -v "$(pwd):/home/dev/app:z" -p 5173:5173 --userns=keep-id react-devcontainer bash



# --- SECTION: Base Image ---
# Start with the lightweight Alpine Linux base image
FROM alpine:latest

# --- SECTION: Install Essential Packages ---
# Update package index and install necessary packages
RUN apk update && apk add --no-cache \
  neovim \
  git \
  bash \
  build-base 

RUN apk add --no-cache \
  nodejs \
  npm 

# --- SECTION: Build Arguments ---
# Define Arguments to customize user and group IDs, and Neovim config URL
ARG USER=dev          # Default container username
ARG UID=1000          # Default User ID - matches host user for permission consistency
ARG GROUP=devcontainer # Default group name
ARG GUID=5678         # Default Group ID - matches host group for permission consistency
ARG NEOVIM_CONFIG_GIT_URL=https://github.com/sinhaaritro/nvim-dotfiles.git # Default Neovim config Git URL

# --- SECTION: Create User and Group ---
# Create the 'devcontainer' group with specified GUID
# Create the 'dev' user with specified UID, belonging to 'devcontainer' group
RUN addgroup -g ${GUID} ${GROUP} && \
  adduser -u ${UID} -G ${GROUP} -s /bin/bash -D ${USER}

# --- SECTION: Switch to the 'dev' User ---
# All subsequent commands will be executed as the 'dev' user
USER ${USER}

# --- SECTION: Clone Neovim Configuration ---
# Clone Neovim dotfiles from GitHub into the user's .config/nvim directory
# Set ownership of the .config/nvim directory to the 'dev' user and 'devcontainer' group
RUN git clone ${NEOVIM_CONFIG_GIT_URL} /home/${USER}/.config/nvim && \
  chown -R ${USER}:${GROUP} /home/${USER}/.config/nvim 

# --- SECTION: Set Working Directory ---
# Create the 'app' directory and set ownership and permissions as root
# Set ownership of the 'app' directory to the 'dev' user and 'devcontainer' group
# Set the working directory for the container to /home/dev/app
RUN mkdir -p /home/${USER}/app && \
  chown -R ${USER}:${GROUP} /home/${USER}/app && \
  chmod -R 775 /home/${USER}/app 
WORKDIR /home/${USER}/app

# --- SECTION: Expose Port ---
# Expose port 5173 for Vite React app
EXPOSE 5173

# --- SECTION: Default Command ---
# Set the default command to run when the container starts - bash shell
CMD ["bash"]
