import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import Pattern "pattern";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let patterns = Map.empty<Text, Pattern.PatternWithOwner>();
  var patternsOrder : [Pattern.PatternWithOwner] = [];

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
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

  // Pattern management with ownership
  public shared ({ caller }) func savePattern(pattern : Pattern.Pattern) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save patterns");
    };

    // Check if pattern exists and verify ownership
    switch (patterns.get(pattern.name)) {
      case (?existingPattern) {
        if (existingPattern.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only modify your own patterns");
        };
      };
      case null {};
    };

    let patternWithOwner : Pattern.PatternWithOwner = {
      pattern = pattern;
      owner = caller;
    };
    patterns.add(pattern.name, patternWithOwner);
    patternsOrder := patterns.values().toArray().sort(
      func(a : Pattern.PatternWithOwner, b : Pattern.PatternWithOwner) : Order.Order {
        Pattern.Pattern.compareByCreatedAt(a.pattern, b.pattern);
      },
    );
  };

  public query ({ caller }) func listPatterns() : async [Pattern.Pattern] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list patterns");
    };
    patternsOrder.map<Pattern.PatternWithOwner, Pattern.Pattern>(
      func(p : Pattern.PatternWithOwner) : Pattern.Pattern { p.pattern },
    );
  };

  public query ({ caller }) func getPattern(name : Text) : async Pattern.Pattern {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view patterns");
    };
    switch (patterns.get(name)) {
      case (null) { Runtime.trap("Pattern not found") };
      case (?patternWithOwner) { patternWithOwner.pattern };
    };
  };

  public shared ({ caller }) func deletePattern(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete patterns");
    };

    switch (patterns.get(name)) {
      case (null) { Runtime.trap("Pattern not found") };
      case (?patternWithOwner) {
        if (patternWithOwner.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own patterns");
        };
      };
    };

    patterns.remove(name);
    patternsOrder := patterns.values().toArray().sort(
      func(a : Pattern.PatternWithOwner, b : Pattern.PatternWithOwner) : Order.Order {
        Pattern.Pattern.compareByCreatedAt(a.pattern, b.pattern);
      },
    );
  };

  public shared ({ caller }) func updatePatternThumbnail(name : Text, thumbnail : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update patterns");
    };

    let patternWithOwner = switch (patterns.get(name)) {
      case (null) { Runtime.trap("Pattern not found") };
      case (?p) { p };
    };

    if (patternWithOwner.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only modify your own patterns");
    };

    let updatedPattern = { patternWithOwner.pattern with thumbnail = ?thumbnail };
    let updatedPatternWithOwner = { patternWithOwner with pattern = updatedPattern };
    patterns.add(name, updatedPatternWithOwner);
    patternsOrder := patterns.values().toArray().sort(
      func(a : Pattern.PatternWithOwner, b : Pattern.PatternWithOwner) : Order.Order {
        Pattern.Pattern.compareByCreatedAt(a.pattern, b.pattern);
      },
    );
  };

  public shared ({ caller }) func createPattern(name : Text, gCode : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create patterns");
    };

    let pattern : Pattern.Pattern = {
      name;
      gCode;
      ledPresets = null;
      thumbnail = null;
      createdAt = Time.now();
    };
    await savePattern(pattern);
  };

  public shared ({ caller }) func updatePatternLEDs(name : Text, leds : Pattern.LEDPreset) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update patterns");
    };

    let patternWithOwner = switch (patterns.get(name)) {
      case (null) { Runtime.trap("Pattern not found") };
      case (?p) { p };
    };

    if (patternWithOwner.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only modify your own patterns");
    };

    let updatedPattern = { patternWithOwner.pattern with ledPresets = ?leds };
    let updatedPatternWithOwner = { patternWithOwner with pattern = updatedPattern };
    patterns.add(name, updatedPatternWithOwner);
    patternsOrder := patterns.values().toArray().sort(
      func(a : Pattern.PatternWithOwner, b : Pattern.PatternWithOwner) : Order.Order {
        Pattern.Pattern.compareByCreatedAt(a.pattern, b.pattern);
      },
    );
  };

  public query ({ caller }) func patternExists(name : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check patterns");
    };
    patterns.containsKey(name);
  };

  public query ({ caller }) func getPatternCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get pattern count");
    };
    patterns.size();
  };
};
