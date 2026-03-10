import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let quizAttemptsStore = Map.empty<Principal, List.List<QuizAttempt>>();
  let topicProgressStore = Map.empty<Principal, List.List<TopicProgress>>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Types
  public type Topic = {
    #newtons_first_law;
    #newtons_second_law;
    #newtons_third_law;
    #free_body_diagram;
    #tension_force;
  };

  public type QuizAttempt = {
    topic : Topic;
    questionId : Text;
    selectedAnswer : Text;
    isCorrect : Bool;
    timestamp : Time.Time;
  };

  public type TopicProgress = {
    topic : Topic;
    lessonsCompleted : Nat;
    quizScore : Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Store a quiz attempt for a user
  public shared ({ caller }) func recordQuizAttempt(attempt : QuizAttempt) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record quiz attempts");
    };
    let currentAttempts = switch (quizAttemptsStore.get(caller)) {
      case (null) { List.empty<QuizAttempt>() };
      case (?attempts) { attempts };
    };
    currentAttempts.add(attempt);
    quizAttemptsStore.add(caller, currentAttempts);
  };

  // Update topic progress for a user
  public shared ({ caller }) func updateTopicProgress(progress : TopicProgress) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update topic progress");
    };
    let currentProgress = switch (topicProgressStore.get(caller)) {
      case (null) { List.empty<TopicProgress>() };
      case (?progress) { progress };
    };

    let existingIndex = currentProgress.toArray().findIndex(func(p : TopicProgress) : Bool { p.topic == progress.topic });
    let updatedProgress = switch (existingIndex) {
      case (null) {
        currentProgress;
      };
      case (?index) {
        currentProgress;
      };
    };
    updatedProgress.add(progress);
    topicProgressStore.add(caller, updatedProgress);
  };

  // Admin function to fetch all users' quiz attempts
  public query ({ caller }) func getAllQuizAttempts() : async [(Principal, [QuizAttempt])] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all quiz attempts");
    };
    quizAttemptsStore.toArray().map<(Principal, List.List<QuizAttempt>), (Principal, [QuizAttempt])>(func((user, attempts)) { (user, attempts.toArray()) });
  };

  // Admin function to fetch all users' topic progress
  public query ({ caller }) func getAllTopicProgress() : async [(Principal, [TopicProgress])] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all topic progress");
    };
    topicProgressStore.toArray().map<(Principal, List.List<TopicProgress>), (Principal, [TopicProgress])>(func((user, progress)) { (user, progress.toArray()) });
  };

  // Get quiz history for a specific user
  public query ({ caller }) func getUserQuizHistory(user : Principal) : async [QuizAttempt] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own quiz history");
    };
    switch (quizAttemptsStore.get(user)) {
      case (null) { [] };
      case (?attempts) { attempts.toArray() };
    };
  };

  // Get topic progress for a specific user
  public query ({ caller }) func getUserTopicProgress(user : Principal) : async [TopicProgress] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own topic progress");
    };
    switch (topicProgressStore.get(user)) {
      case (null) { [] };
      case (?progress) { progress.toArray() };
    };
  };
};
